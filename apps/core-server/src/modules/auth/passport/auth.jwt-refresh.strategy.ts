// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Passport Imports
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// ** Dto, Type, enum Import
import { JwtPayload } from '../../../global/types';
import AuthService from '../service/auth.service';

// ** Custom Module Imports

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request.body.refreshToken;
        },
      ]),
      passReqToCallback: true,
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  public async validate(req, payload: JwtPayload): Promise<any> {
    return await this.authService.findRefreshToken(payload);
  }
}
