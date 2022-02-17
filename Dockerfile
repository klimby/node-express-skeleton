FROM node:14-alpine as build

WORKDIR /usr/src/app

COPY . .

RUN npm install

#FROM node:14-alpine as production
