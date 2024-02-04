FROM node:18-alpine as base

RUN npm i -g pnpm
FROM base AS dependencies
WORKDIR /app
COPY package.json ./
RUN pnpm install

FROM base AS build
WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM base as prod

WORKDIR /app

ENV NODE_ENV development

COPY --from=build /app .

RUN touch /app/ormlogs.log && chown node:node /app/ormlogs.log

USER node

EXPOSE 8080

ENV PORT 8080

CMD ["node", "dist/main"]