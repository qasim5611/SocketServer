FROM alpine
LABEL maintainer="qmuhammad144@gmail.com"
RUN apk add --update nodejs npm
COPY . /src
WORKDIR /src
RUN npm install
ENV CREATEDBY="Muhammad Qasim"
EXPOSE 8080
ENTRYPOINT ["node", "./app.js"]