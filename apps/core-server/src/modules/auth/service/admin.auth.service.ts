// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports
import Admin from '../../admin/domain/admin.entity';

@Injectable()
export default class AdminAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private logger = new Logger(AdminAuthService.name);

  /**
   * 토큰을 재발급합니다.
   */
  public reissueToken(admin: Admin): string {
    const payload = { userId: admin.adminId, email: admin.email };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });

    return accessToken;
  }

  /**
   * 토큰을 발급합니다.
   */
  public generateToken(admin: Admin): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload = { adminId: admin.adminId, email: admin.email };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      }),
    };
  }
}
