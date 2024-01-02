FROM node:18-alpine as dev
WORKDIR /app

ENV NODE_ENV development

COPY . .

RUN yarn --frozen-lockfile && yarn cache clean

FROM node:18-alpine as build
WORKDIR /app

ENV NODE_ENV development

COPY --from=dev /app .

RUN yarn build

RUN yarn --frozen-lockfile --production && yarn cache clean

FROM node:18-alpine as prod

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV development

COPY --from=build /app/dist dist
COPY  --from=build /app/node_modules node_modules

USER node

CMD ["node", "dist/main"]