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
export default class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  public async validate(req, payload: JwtPayload): Promise<any> {
    return await this.userService.findUserByPayload(payload);
  }
}
