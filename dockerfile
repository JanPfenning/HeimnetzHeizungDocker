### STAGE 1: Build ###
FROM node:16-alpine3.14 AS build

USER root
RUN mkdir -p /opt/app/
WORKDIR /opt/app/

COPY ./package*.json .
RUN npm install

COPY . .
#RUN npm run build
RUN npm run build app -- --configuration production

### STAGE 2: Run ###
FROM nginx:1.21-alpine as nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /opt/app/dist/app /usr/share/nginx/html
