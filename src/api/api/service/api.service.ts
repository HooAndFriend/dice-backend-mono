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

@Injectable()
export default class ApiService {
  constructor(
    private readonly apiRepository: ApiRepository,
    private readonly configService: ConfigService,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  public async saveApi(dto: RequestApiSaveDto, user: User) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saveApi = await queryRunner.manager.save(
        this.apiRepository.create({
          name: dto.name,
          type: dto.type,
          endpoint: dto.endpoint,
          createdUser: user,
          modifiedUser: user,
        }),
      );

      await queryRunner.commitTransaction();

      return CommonResponse.createResponseMessage({
        statusCode: 200,
        message: '새로운 api를 생성합니다.',
      });
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }

  public async updateApi(dto: RequestApiUpdateDto, user: User) {
    await this.apiRepository.update(dto.id, {
      name: dto.name,
      type: dto.type,
      endpoint: dto.endpoint,
      modifiedUser: user,
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
