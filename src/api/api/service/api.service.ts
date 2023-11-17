// ** Nest Imports
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import ApiRepository from '../repository/api.repository';
import RequestApiSaveDto from '../dto/api.save.dto';
import CommonResponse from '../../../common/dto/api.response';
import ApiHeaderRepository from '../repository/header.repository';
import RequestApiUpdateDto from '../dto/api.update.dto';

// Other Imports

@Injectable()
export default class ApiService {
  constructor(
    private readonly apiRepository: ApiRepository,
    private readonly configService: ConfigService,
    private readonly apiHeaderRepository: ApiHeaderRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  public async saveApi(dto: RequestApiSaveDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saveApi = await queryRunner.manager.save(
        this.apiRepository.create({
          name: dto.name,
          type: dto.type,
          endpoint: dto.endpoint,
        }),
      );

      // const saveHeader = await queryRunner.manager.save(
      //   this.apiHeaderRepository.create({
      //     key: '',
      //     value: '',
      //     description: '',
      //   })
      // )

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

  public async updateApi(dto: RequestApiUpdateDto) {
    await this.apiRepository.update(dto.id, {
      name: dto.name,
      type: dto.type,
      endpoint: dto.endpoint,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'api의 정보를 수정합니다.',
    });
  }
}
