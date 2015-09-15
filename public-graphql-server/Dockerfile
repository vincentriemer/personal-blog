FROM node:4.0

RUN npm install -g babel knex

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY ./src /usr/src/app/src
COPY ./knexfile.js /usr/src/app/knexfile.js
COPY ./migrations /usr/src/app/migrations

CMD ["npm", "start"]