FROM node:8.12.0-alpine
#FROM gitlab/gitlab-runner:alpine

RUN apk update && apk upgrade && \
    apk add --no-cache alpine-sdk && \
    apk add --no-cache python && \ 
    git config --global url.https://github.com/.insteadOf git://github.com/

COPY ./package*.json /app/
COPY ./app.js /app
COPY ./api /app/api
COPY ./build /app/build

EXPOSE 5000

WORKDIR /app
RUN npm install --production

#RUN npm start http://172.28.0.23:8545
