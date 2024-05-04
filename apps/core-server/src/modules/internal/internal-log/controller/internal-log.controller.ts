// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports

// ** Swagger Imports
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Internal Log Controller')
@Controller({ path: '/internal/log', version: '1' })
export default class InternalLogController {}
