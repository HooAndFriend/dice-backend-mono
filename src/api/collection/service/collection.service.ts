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

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import CollectionRepository from '../repository/collection.repository';
import ApiRepository from '../../api/repository/api.repository';

// ** enum, dto, entity, types Imports
import RequestCollectionSaveDto from '../dto/collection.save.dto';
import RequestCollectionUpdateDto from '../dto/collection.update.dto';
import User from '../../user/domain/user.entity';
import Api from '../../api/domain/api.entity';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';

@Injectable()
export default class CollectionService {
  constructor(
    private readonly collectionRepository: CollectionRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  public async saveCollection(dto: RequestCollectionSaveDto) {
    const findWorkspace = await this.workspaceRepository.findOne({
      where: { id: dto.workspaceId },
    });

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException(
        '워크스페이스를 찾을 수 없습니다.',
      );
    }
    await this.collectionRepository.save(
      this.collectionRepository.create({
        name: dto.name,
        workspace: findWorkspace,
      }),
    );
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'collection을 생성합니다.',
    });
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
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'collection을 수정합니다.',
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

  public async findCollectionList(workspaceId: number) {
    const findWorkspace = await this.workspaceRepository.findOne({
      where: { id: workspaceId },
    });

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException(
        '워크스페이스를 찾을 수 없습니다.',
      );
    }
    const [data, count] = await this.collectionRepository.findApiList(
      workspaceId,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Collection 리스트를 조회합니다.',
      data: { data, count },
    });
  }
}
