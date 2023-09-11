// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Passport Imports
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

// ** enum, dto, entity Imports
import ApiResponse from 'src/common/dto/api.response';

// ** Custom Module Imports
import AuthService from '../service/auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(email: string, password: string): Promise<ApiResponse<any>> {
    return await this.authService.localLogin({ email, password });
  }
}
