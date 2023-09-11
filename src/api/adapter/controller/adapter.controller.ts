// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Swagger Imports
import { ApiTags } from '@nestjs/swagger';

// ** Custom Module Imports
import AdapterService from '../service/adapter.service';

@ApiTags('Adapter')
@Controller('/api/adapter')
export default class AdapterController {
  constructor(private readonly adapterService: AdapterService) {}
}
