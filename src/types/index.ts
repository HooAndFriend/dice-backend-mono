import { UserRole } from 'src/api/auth/dto/user.role';

export interface JwtPayload {
  id: number;
  role: UserRole;
  iat?: number;
  exp?: number;
}
