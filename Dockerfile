FROM alpine
RUN apk update && apk upgrade
RUN apk add nodejs
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 8080
ENTRYPOINT [ "node", "server.js" ]
