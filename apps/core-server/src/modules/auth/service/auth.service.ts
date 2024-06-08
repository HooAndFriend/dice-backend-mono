// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports
import User from '../../user/domain/user.entity';

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private logger = new Logger(AuthService.name);

  /**
   * 토큰을 재발급합니다.
   * @param user
   * @returns
   */
  public async reissueToken(user: User) {
    const accessToken = this.jwtService.sign(
      { id: user.userId },
      {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    );

    return accessToken;
  }

  /**
   * 토큰을 발급합니다.
   * @param user
   * @returns
   */
  public generateToken(user: User): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload = { id: user.userId, email: user.email };
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
