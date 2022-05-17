###########
# BUILDER #
###########

# Setup and build the client

FROM node:18.1.0-alpine as builder

# set working directory
WORKDIR /home/node/app

RUN chown -R node:node /home/node/*

USER node

# RUN yarn upgrade caniuse-lite browserslist

RUN yarn install

RUN yarn build

# Setup the server

FROM node:18.1.0-alpine

ENV NPM_CONFIG_PRODUCTION false

RUN apk update \
  # curl depenencies
  && apk add curl \
  # Git depenencies
  && apk add git

RUN addgroup -S app && adduser -S app -G app

RUN npm config set unsafe-perm true && npm install -g pm2

ENV HOME=/home/app

COPY backend/package*.json $HOME/nuxt/
RUN chown -R app:app $HOME/*

USER app

WORKDIR $HOME/nuxt

COPY --from=builder /home/node/app/build/ ./build/

RUN npm ci

COPY --chown=app:app backend .

RUN npm run build

CMD ["pm2-runtime", "processes.json"]
