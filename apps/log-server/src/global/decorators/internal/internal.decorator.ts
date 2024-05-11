// ** Nest Imports
import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '@hi-dice/common';

export const INTERNAL_KEY = 'internal';
export const InternalKey = (role: RoleEnum) => SetMetadata(INTERNAL_KEY, role);
