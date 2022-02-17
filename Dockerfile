FROM node:14-alpine as build

WORKDIR /usr/src/app

COPY . .

RUN npm install \
    && npm run-script build

FROM node:14-alpine as production

ENV NODE_SERVER_PORT=3000 \
    NODE_ENV="production" \
    LOCALE="en"

WORKDIR /app

RUN mkdir dist config logs storage

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/config/production.json ./config/default.json
COPY --from=build /usr/src/app/config/production.json ./config/production.json
COPY --from=build /usr/src/app/package.json ./package.json

RUN npm install --production \
    && chown -R node:node /app \
    && chmod -R 777 /app/logs

EXPOSE 3000

USER node

CMD ["node", "dist"]
