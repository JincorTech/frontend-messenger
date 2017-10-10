FROM node:8.0.0-alpine

WORKDIR /usr/src/messenger
ADD . /usr/src/messenger
RUN npm i
RUN npm run build
VOLUME /usr/src/messenger
CMD npm start
