// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import StateService from '../service/state.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { StateResponse } from '@/src/global/response/state.response';
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import CommonResponse from '@/src/global/dto/api.response';
import RequestStateSaveDto from '../dto/state.save.dto';
import { GetAdmin } from '@/src/global/decorators/user/admin.decorators';
import Admin from '../../admin/domain/admin.entity';
import RequestStateUpdateDto from '../dto/state.update.dto';

// ** Dto Imports

@ApiTags('State')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/state', version: '1' })
export default class StateController {
  constructor(private readonly stateService: StateService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'State 생성' })
  @ApiBody({ type: RequestStateSaveDto })
  @ApiResponse(StateResponse.saveState[200])
  @ApiResponse(StateResponse.saveState[400])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveState(@Body() dto: RequestStateSaveDto) {
    await this.stateService.existedState(dto.name);
    const adminAuthority = await this.stateService.saveState(dto);

    return CommonResponse.createResponse({
      data: adminAuthority,
      statusCode: 200,
      message: '새로운 상태값을 생성했습니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'State 삭제' })
  @ApiResponse(StateResponse.deleteState[200])
  @ApiResponse(StateResponse.deleteState[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteVersion(@Param('id') id: number) {
    await this.stateService.existedStateById(id);
    await this.stateService.deleteState(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '상태값을 삭제합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'State 수정' })
  @ApiBody({ type: RequestStateUpdateDto })
  @ApiResponse(StateResponse.updateState[200])
  @ApiResponse(StateResponse.updateState[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateVersion(@Body() dto: RequestStateUpdateDto) {
    await this.stateService.existedStateById(dto.stateId);
    await this.stateService.updateState(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '상태값을 수정했습니다.',
    });
  }
}
