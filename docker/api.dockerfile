FROM node:16  AS installer

WORKDIR /var/www/app
COPY . .

RUN rm -rf node_modules
RUN npm install

FROM node:16-alpine
# RUN apk update && apk add --no-cache zsh
WORKDIR /var/www/app
COPY --from=installer /var/www/app ./
CMD [ "npm", "run", "start:dev" ]