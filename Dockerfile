FROM node:16-alpine as ReactJS

WORKDIR /app

COPY . .

COPY package*.json /app
COPY yarn.lock /app

RUN npm install --legacy-peer-deps

RUN npm run build:dev

FROM nginx:alpine3.17 as nginx

COPY --from=ReactJS /app/build/ /var/www/dist/

COPY --from=ReactJS /app/nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=1m --timeout=3s \
  CMD curl -f http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]