FROM node:lts-alpine3.9
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3200