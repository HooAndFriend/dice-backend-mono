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
} from '@nestjs/common';

// ** Module Imports
import CollectionService from '../service/collection.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Dto Imports
import RequestCollectionUpdateDto from '../dto/collection.update.dto';
import RequestCollectionSaveDto from '../dto/collection.save.dto';
import User from '../../user/domain/user.entity';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetUser } from '../../../common/decorators/user.decorators';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';
import { CollectionResponse } from '../../../response/collection.response';

@ApiTags('Workspace Collection')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/collection', version: '1' })
export default class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'collection 생성' })
  @ApiBody({ type: RequestCollectionSaveDto })
  @ApiResponse(CollectionResponse.saveCollection[200])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveCollection(
    @Body() dto: RequestCollectionSaveDto,
    @GetUser() user: User,
  ) {
    return await this.collectionService.saveCollection(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'collection 수정' })
  @ApiBody({ type: RequestCollectionUpdateDto })
  @ApiResponse(CollectionResponse.updateCollection[200])
  @ApiResponse(CollectionResponse.updateCollection[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateCollection(
    @Body() dto: RequestCollectionUpdateDto,
    @GetUser() user: User,
  ) {
    return await this.collectionService.updateCollection(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'collection 조회' })
  @ApiResponse(CollectionResponse.findCollection[200])
  @ApiResponse(CollectionResponse.findCollection[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findCollection(@Param('id') id: number) {
    return await this.collectionService.findCollection(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'collection 삭제' })
  @ApiResponse(CollectionResponse.deleteCollection[200])
  @ApiResponse(CollectionResponse.deleteCollection[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteCollection(@Param('id') id: number) {
    return await this.collectionService.deleteCollection(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'collection api 리스트 조회' })
  @ApiResponse(CollectionResponse.findApiList[200])
  @UseGuards(JwtAccessGuard)
  @Get('getApiList/:collectionId')
  public async findApiList(@Param('collectionId') collectionId: number) {
    return await this.collectionService.findApiList(collectionId);
  }
}
