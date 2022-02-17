FROM node:latest

ENV MONGO_URL='mongodb://database/join-us-database'
ENV PORT='3000'

WORKDIR /lucasgois/join-us-server

COPY package*.json ./

RUN yarn install --production

COPY ./dist ./dist

EXPOSE 3000

CMD npm start