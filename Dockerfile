FROM node:lts-slim



WORKDIR /home/ec2-user/catApp/

EXPOSE 5000

# You can change this
CMD [ "npm", "run", "start" ]
