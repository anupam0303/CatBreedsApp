FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH

# install node_modules
ADD package.json /usr/src/app/package.json
RUN npm install

ADD . /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]


