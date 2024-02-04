// ** Nest Imports
import { Controller, Post, Body, UseGuards, Get, Ip } from '@nestjs/common';

// ** Module Imports
import AuthService from '../service/auth.service';

// ** Swagger Imports
import { ApiTags, ApiResponse } from '@nestjs/swagger';

// ** Response Imports
import { createServerExceptionResponse } from '../../../global/response/common';

@ApiTags('Auth')
@ApiResponse(createServerExceptionResponse())
@Controller({ path: '/auth', version: '1' })
export default class AuthController {
  constructor(private readonly authService: AuthService) {}
}
