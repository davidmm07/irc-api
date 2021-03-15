# Pull node image from docker hub
FROM node:10-alpine

# Set working directory
RUN mkdir -p /var/www/irc-api
WORKDIR /var/www/irc-api

ENV PATH /var/www/irc-api/node_modules/.bin:$PATH
RUN adduser --disabled-password chat

COPY . /var/www/irc-api

COPY package.json /var/www/irc-api/package.json
COPY package-lock.json /var/www/irc-api/package-lock.json

RUN chown -R chat:chat /var/www/irc-api
USER chat

RUN npm cache clean --force
RUN npm install

EXPOSE 3004
CMD [ "npm", "run", "start" ]
