FROM node:8.0.0-alpine

VOLUME /usr/src/messenger
WORKDIR /usr/src/messenger
ADD . /usr/src/messenger
RUN npm i
RUN npm run build
CMD npm start
