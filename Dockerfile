FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 5000

# You can change this
CMD [ "npm", "run", "start" ]
