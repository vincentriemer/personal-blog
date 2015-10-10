FROM node:4

RUN npm install -g babel knex forever@v0.14.2

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY ./src /usr/src/app/src
COPY ./knexfile.js /usr/src/app/knexfile.js
COPY ./.foreverignore /usr/src/app/.foreverignore

CMD npm start