// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Passport Imports
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class LocalGuard extends AuthGuard('local') {}
