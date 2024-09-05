// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
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
import JwtAccessGuard from '@/src/modules/auth/passport/auth.jwt-access.guard';

// ** Response Imports
import { CommonResponse } from '@hi-dice/common';
import { StateResponse } from '@/src/global/response/state.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

// ** Dto Imports
import RequestStateSaveDto from '../dto/state.save.dto';
import RequestStateUpdateDto from '../dto/state.update.dto';
import { RequestPagingDto } from '@hi-dice/common';

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
      statusCode: 200,
      message: '새로운 상태값을 생성했습니다.',
      data: adminAuthority,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'State List 조회' })
  @ApiResponse(StateResponse.findStateList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findStateList(@Query(ValidationPipe) query: RequestPagingDto) {
    const [data, count] = await this.stateService.findStateList(query);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '상태값 리스트를 조회합니다.',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'State 조회' })
  @ApiResponse(StateResponse.findState[200])
  @ApiResponse(StateResponse.findState[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findState(@Param('id') id: number) {
    const version = await this.stateService.findState(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '상태값을 조회합니다.',
      data: version,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'State 삭제' })
  @ApiResponse(StateResponse.deleteState[200])
  @ApiResponse(StateResponse.deleteState[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteState(@Param('id') id: number) {
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
  public async updateState(@Body() dto: RequestStateUpdateDto) {
    await this.stateService.existedStateById(dto.id);
    await this.stateService.updateState(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '상태값을 수정했습니다.',
    });
  }
}
