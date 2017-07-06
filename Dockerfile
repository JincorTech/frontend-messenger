FROM node:8.0.0-alpine

VOLUME /usr/src/messenger
WORKDIR /usr/src/messenger

RUN npm i
CMD /bin/true
