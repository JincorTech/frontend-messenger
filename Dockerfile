FROM node:6.10.3-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/
ADD npm-shrinkwrap.json /usr/src/app/
RUN npm i
ADD . /usr/src/app/

CMD npm start
