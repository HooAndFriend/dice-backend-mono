// ** Nest Imports
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

// ** Swagger Imports
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Dto Imports

import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';
import CollectionService from '../service/collection.service';
import { GetUser } from '../../../common/decorators/user.decorators';
import RequestCollectionSaveDto from '../dto/collection.save.dto';
import { CollectionResponse } from '../../../response/collection.response';
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import User from '../../user/domain/user.entity';
import RequestCollectionUpdateDto from '../dto/collection.update.dto';

@ApiTags('Workspace Collection')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace/collection', version: '1' })
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
  ) {
    return await this.collectionService.saveCollection(dto);
  }

   
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'collection 수정' })
  @ApiBody({ type: RequestCollectionUpdateDto})
  @ApiResponse(CollectionResponse.updateCollection[200])
  @ApiResponse(CollectionResponse.updateCollection[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateCollection(
    @Body() dto: RequestCollectionUpdateDto,
  ) {
    return await this.collectionService.updateCollection(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'collection 조회' })
  @ApiResponse(CollectionResponse.findCollection[200])
  @ApiResponse(CollectionResponse.findCollection[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findWorkspace(@Param('id') id: number) {
   // return await this.collectionService(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'collection 삭제' })
  @ApiResponse(CollectionResponse.deleteCollection[200])
  @ApiResponse(CollectionResponse.deleteCollection[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteCollection(@Param('id') id: number) {
   // return await this.collectionService(id);
  }
}
