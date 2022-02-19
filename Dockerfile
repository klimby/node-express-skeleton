FROM node:14-alpine as build

WORKDIR /home/node/app

COPY . .

RUN npm install \
    && npm run-script build

FROM node:14-alpine as production

ENV NODE_SERVER_PORT=3000 \
    NODE_ENV="production" \
    LOCALE="en"

WORKDIR /home/node/app

RUN mkdir dist config logs storage

COPY --from=build /home/node/app/dist ./dist
COPY --from=build /home/node/app/config/default.json ./config/default.json
COPY --from=build /home/node/app/config/production.json ./config/production.json
COPY --from=build /home/node/app/package.json ./package.json

RUN npm install --production \
    && chown -R node:node /home/node/app \
    && chmod -R 777 /home/node/app/logs \
    && chmod -R 777 /home/node/app/config

EXPOSE 3000

VOLUME /home/node/app/logs
VOLUME /home/node/app/config

USER node

CMD ["node", "dist"]
