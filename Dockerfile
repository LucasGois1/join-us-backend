FROM node:latest

WORKDIR /lucasgois/join-us-server

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 5000

CMD yarn start