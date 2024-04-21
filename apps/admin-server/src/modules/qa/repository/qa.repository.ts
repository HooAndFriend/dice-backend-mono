// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Qa from '../domain/qa.entity';
// ** Emum Imports
import RequestQaFindDto from '../dto/qa.find.dto';
import { TaskStatusEnum } from '@/src/global/enum/TaskStatus.enum';

@CustomRepository(Qa)
export default class QaRepository extends Repository<Qa> {
  public async findQaListByQuery(dto: RequestQaFindDto) {
    console.log(dto.workspaceId, typeof Number(dto.workspaceId));
    const queryBuilder = this.createQueryBuilder('qa')
      .select([
        'qa.id',
        'qa.code',
        'qa.status',
        'qa.title',
        'qa.asIs',
        'qa.toBe',
        'qa.memo',
        'qa.adminId',
        'admin.email',
        'admin.nickname',
        'admin.profile',
        'qaFile.id',
        'qaFile.url',
        'qa.createdDate',
        'qa.modifiedDate',
      ])
      .leftJoin('qa.admin', 'admin')
      .leftJoin('qa.qaFile', 'qaFile')
      .where('qa.workspaceId = :workspaceId', {
        workspaceId: dto.workspaceId,
      })
      .orderBy('qa.createdDate', 'DESC');

    if (dto.status) {
      queryBuilder.andWhere('qa.status = :status', {
        status: dto.status,
      });
    }

    if (dto.title) {
      queryBuilder.andWhere('qa.title LIKE :title', {
        title: `%${dto.title}%`,
      });
    }
    if (dto.code) {
      queryBuilder.andWhere('qa.code LIKE :code', {
        number: `%${dto.code}%`,
      });
    }

    if (dto.createdDate) {
      queryBuilder.andWhere('qa.createdDate >= :createdDate', {
        createdDate: `${dto.createdDate}`,
      });
    }

    if (dto.modifiedDate) {
      queryBuilder.andWhere('qa.modifiedDate <= :modifiedDate', {
        modifiedDate: `${dto.modifiedDate}`,
      });
    }

    return await queryBuilder.getManyAndCount();
  }

  public async findQaById(id: number) {
    return await this.createQueryBuilder('qa')
      .select([
        'qa.id',
        'qa.code',
        'qa.status',
        'qa.title',
        'qa.asIs',
        'qa.toBe',
        'qa.memo',
        'qa.createdDate',
        'qa.modifiedDate',
        'admin.email',
        'admin.nickname',
        'admin.profile',
        'qaFile.id',
        'qaFile.url',
      ])
      .leftJoin('qa.admin', 'admin')
      .leftJoin('qa.qaFile', 'qaFile')
      .where('qa.id = :id', {
        id,
      })
      .getOne();
  }
}
