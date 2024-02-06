import AdminRoleEnum from '@/src/modules/admin/domain/admin-role.enum';

export interface JwtPayload {
  id: number;
  role: AdminRoleEnum;
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
