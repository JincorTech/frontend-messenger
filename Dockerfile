FROM node:6.10.3-alpine

VOLUME /usr/src/messenger
WORKDIR /usr/src/messenger

RUN npm i
CMD /bin/true
