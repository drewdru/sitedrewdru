#!/bin/bash
nvm use v24.18.1
git pull origin main
docker compose -f docker-compose.yml -f docker-compose.prod.yml stop
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
yarn db:generate
yarn db:migrate:deploy
echo "Starting installation..."
yarn install
echo "Build started..."
yarn build
echo "Production server starting..."
pm2 stop sitedrewdru
pm2 delete sitedrewdru
pm2 start npm --name sitedrewdru -- run prod
pm2 save
