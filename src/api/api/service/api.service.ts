// ** Nest Imports
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Response Imports
import CommonResponse from '../../../common/dto/api.response';

// ** enum, dto, entity, types Imports
import RequestApiSaveDto from '../dto/api.save.dto';
import RequestApiUpdateDto from '../dto/api.update.dto';
import User from '../../user/domain/user.entity';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import ApiRepository from '../repository/api.repository';
import CollectionRepository from '../../collection/repository/collection.repository';

@Injectable()
export default class ApiService {
  constructor(
    private readonly collectionRepository: CollectionRepository,
    private readonly apiRepository: ApiRepository,
    private readonly configService: ConfigService,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  public async saveApi(dto: RequestApiSaveDto) {
    const findCollection = await this.collectionRepository.findOne({
      where: { id: dto.collectionId },
    });

    if (!findCollection) {
      return CommonResponse.createNotFoundException(
        '해당 collection을 찾을 수 없습니다.',
      );
    }
    await this.apiRepository.save(
      this.apiRepository.create({
        name: dto.name,
        collection: findCollection,
      }),
    );

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '새로운 api를 생성합니다.',
    });
  }

  public async updateApi(dto: RequestApiUpdateDto) {
    await this.apiRepository.update(dto.id, {
      name: dto.name,
      type: dto.apitype,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'api의 정보를 수정합니다.',
    });
  }

  public async findApi(apiId: number) {
    const findApi = await this.apiRepository.findApi(apiId);

    if (!findApi) {
      return CommonResponse.createNotFoundException('api를 찾을 수 없습니다.');
    }

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'api 정보를 조회합니다.',
      data: findApi,
    });
  }

  public async deleteApi(apiId: number) {
    const findApi = await this.apiRepository.findApi(apiId);

    if (!findApi) {
      return CommonResponse.createNotFoundException('api를 찾을 수 없습니다.');
    }

    await this.apiRepository.delete(apiId);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '해당 api를 삭제합니다.',
    });
  }
}
