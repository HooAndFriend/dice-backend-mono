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

// ** Custom Module Imports
import CollectionRepository from '../repository/collection.repository';
import RequestCollectionSaveDto from '../dto/collection.save.dto';
import { DataSource } from 'typeorm';
import CommonResponse from '../../../common/dto/api.response';
import User from '../../user/domain/user.entity';
import RequestCollectionUpdateDto from '../dto/collection.update.dto';

// Other Imports

@Injectable()
export default class CollectionService {
  constructor(
    private readonly collectionRepository: CollectionRepository,
    private readonly configService: ConfigService,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  public async saveCollection(dto: RequestCollectionSaveDto, user: User) {
    const findCollection = await this.collectionRepository.findOne({
      where: { name: dto.name },
    });

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(
        this.collectionRepository.create({
          name: dto.name,
          createdUser: user,
        }),
      );

      await queryRunner.commitTransaction();

      return CommonResponse.createResponseMessage({
        statusCode: 200,
        message: 'collection을 생성합니다.',
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

  public async updateCollection(dto: RequestCollectionUpdateDto) {
    const findCollection = await this.collectionRepository.findOne({
      where: { id: dto.id },
    });

    if (!findCollection) {
      return CommonResponse.createNotFoundException(
        'collection을 찾을 수 없습니다.',
      );
    }

    await this.collectionRepository.update(dto.id, {
      name: dto.name,
      // modifiedUser: ,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'collection을 수정합니다.',
    });
  }

  public async findCollection(collectionId: number) {
    const findCollection = await this.collectionRepository.findCollection(
      collectionId,
    );

    if (!findCollection) {
      return CommonResponse.createNotFoundException(
        'collection을 찾을 수 없습니다.',
      );
    }

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'collection 정보를 조회합니다.',
      data: findCollection,
    });
  }

  public async deleteCollection(collectionId: number) {
    const findCollection = await this.collectionRepository.findCollection(
      collectionId,
    );

    if (!findCollection) {
      return CommonResponse.createNotFoundException(
        'collection을 찾을 수 없습니다.',
      );
    }

    await this.collectionRepository.delete(collectionId);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'collection을 삭제합니다.',
    });
  }
}
