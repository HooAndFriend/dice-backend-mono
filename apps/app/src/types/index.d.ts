export interface JwtPayload {
  id: number;
  iat?: number;
  exp?: number;
}

export interface CommonResponseType {
  statusCode: number;
  message: string;
  data?: T;
  count?: number;
}

declare module 'cache-manager-redis-store' {
  import { Store } from 'cache-manager';

  interface RedisStore {
    create: (options: any) => Store;
  }

  const store: RedisStore;
  export = store;
}
