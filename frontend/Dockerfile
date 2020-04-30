### STAGE 1: Build ###
FROM node:13.12.0-alpine3.10 AS builder

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
WORKDIR /opt/ng

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV PATH="./node_modules/.bin:$PATH"

RUN ng build --prod --output-path=dist

### STAGE 2: Setup ###
FROM nginx:1.17.9-alpine
ARG NGINX_CONF_FILE=default.conf

## Copy our default nginx config
RUN echo "setting up nginx with the following conf file: $NGINX_CONF_FILE"
ADD /nginx/$NGINX_CONF_FILE /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /opt/ng/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
