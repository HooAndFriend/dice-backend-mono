// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Passport Imports
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// ** Dto, Type, enum Import
import { JwtPayload } from '../../../global/types';

// ** Custom Module Imports
import UserService from '../../user/service/user.service';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
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

  public async validate(req: Request, payload: JwtPayload): Promise<any> {
    return await this.userService.findUserByPayload(payload);
  }
}
