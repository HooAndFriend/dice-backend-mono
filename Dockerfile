FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

ENV TZ=Asia/Seoul

CMD ["yarn", "start:dev"]
