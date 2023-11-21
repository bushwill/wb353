FROM node:latest
EXPOSE 8080
EXPOSE 3306
WORKDIR /app

RUN npm init -y
RUN npm install express mysql cors

COPY server.js server.html /app/

CMD ["node", "server.js"]
