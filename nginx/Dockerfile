FROM node:13-alpine as build
WORKDIR /build

COPY ./public public
COPY ./package.json /build
COPY ./package-lock.json /build
COPY ./webpack.config.js /build
COPY ./app/static/ /build/app/static

RUN rm -rf /build/app/static/*.js

RUN npm i
RUN npm run build



FROM nginx:1.17.4-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build /build/app/static /build/app/static
