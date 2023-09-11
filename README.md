## Description

Nest js 보일러 플레이팅

## 폴더 구조

```
📦
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ README.md
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ src
│  ├─ api
│  │  └─ auth
│  │     ├─ auth.module.ts
│  │     ├─ controller
│  │     │  └─ auth.controller.ts
│  │     ├─ domain
│  │     │  └─ user.entity.ts
│  │     ├─ dto
│  │     │  ├─ user.login.dto.ts
│  │     │  ├─ user.passport.jwt.user.dto.ts
│  │     │  ├─ user.passport.user.dto.ts
│  │     │  ├─ user.role.ts
│  │     │  └─ user.save.dto.ts
│  │     ├─ passport
│  │     │  ├─ auth.jwt.guard.ts
│  │     │  ├─ auth.jwt.strategy.ts
│  │     │  ├─ auth.local.guard.ts
│  │     │  └─ auth.local.strategy.ts
│  │     ├─ repository
│  │     │  └─ user.repository.ts
│  │     └─ service
│  │        └─ auth.service.ts
│  ├─ app.module.ts
│  ├─ common
│  │  ├─ dto
│  │  │  └─ api.response.ts
│  │  ├─ entity
│  │  │  └─ BaseTime.Entity.ts
│  │  ├─ roles
│  │  │  ├─ roles.decorator.ts
│  │  │  └─ roles.guard.ts
│  │  └─ types
│  │     └─ index.ts
│  ├─ config
│  │  ├─ env
│  │  │  ├─ .dev.env
│  │  │  ├─ .prod.env
│  │  │  └─ .test.env
│  │  └─ swaggerConfig.ts
│  ├─ main.ts
│  └─ util
│     └─ logger
│        ├─ logger.middleware.ts
│        ├─ logger.module.ts
│        └─ logger.service.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json

```

## Api Document

```

/api-docs

```

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
