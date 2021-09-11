FROM node:latest

WORKDIR /lucasgois/join-us-server

COPY package*.json ./

RUN yarn install --production

COPY ./dist ./dist

EXPOSE 5000

CMD yarn start