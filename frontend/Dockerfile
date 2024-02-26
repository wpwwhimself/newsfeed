FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# build
RUN npm run build
WORKDIR /app/build

# serve
RUN npm install -g http-server
EXPOSE 80

CMD ["http-server", "-p", "80"]
