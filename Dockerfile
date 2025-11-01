FROM node:alpine

RUN mkdir -p /usr/src/bolso && chown -R node:node /usr/src/bolso

WORKDIR /usr/src/bolso

COPY package.json ./

USER node

RUN npm install --pure-lockfile

COPY --chown=node:node . .

# COPY --chown=node:node .env .env

# RUN npm run test

EXPOSE 3000

CMD ["node", "src/index.js"]