FROM node:13-alpine

COPY ./package*.json /front/

WORKDIR /front

RUN npm install

COPY . .

RUN npm install --silent

CMD ["npm", "start"]
