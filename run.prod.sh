#!/bin/bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml stop
git pull origin main
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
yarn db:generate
yarn db:migrate:dev
echo "Starting installation..."
yarn install
echo "Build started..."
yarn build
echo "Production server starting..."
sudo pm2 stop sitedrewdru
sudo pm2 delete sitedrewdru
sudo pm2 start yarn --name sitedrewdru -- run prod
sudo pm2 save
