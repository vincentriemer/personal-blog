FROM iojs:latest

RUN npm install -g forever knex

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY ./src /usr/src/app/src

CMD ["npm", "start"]