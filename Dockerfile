FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# install node_modules
ADD package.json /usr/src/app/package.json
RUN npm install

ADD . /usr/src/app

EXPOSE 5000

CMD [ "npm", "run", "start" ]
