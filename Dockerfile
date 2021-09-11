FROM node:latest

WORKDIR /lucasgois/join-us-server

COPY package*.json ./

RUN npm install --only=prod

COPY ./dist ./dist

EXPOSE 5000

CMD yarn start