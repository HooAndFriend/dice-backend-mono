// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Qa from '../domain/qa.entity';
// ** Emum Imports
import { QaStatus } from '../../../global/enum/QaStatus.enum';
import RequestQaFindDto from '../dto/qa.find.dto';

@CustomRepository(Qa)
export default class QaRepository extends Repository<Qa> {
    public async findQaList(findQuery: RequestQaFindDto) {
        const queryBuilder = this.createQueryBuilder('qa')
            .select([
                'qa.id',
                'qa.number',
                'qa.status',
                'qa.title',
                'qa.asIs',
                'qa.toBe',
                'qa.memo',
                'qa.adminId',
                'admin.email',
                'admin.nickname',
                'admin.profile',
                'file.id',
                'file.url',
                'qa.createdDate',
                'qa.modifiedDate',
            ])
            .leftJoin('qa.admin', 'admin')
            .leftJoin('qa.file', 'file');

        if (findQuery.status !== QaStatus.ALL) {
            queryBuilder.andWhere('qa.status = :status', {
                status: findQuery.status,
            });
        }
        if (findQuery.title) {
            queryBuilder.andWhere('qa.title LIKE :title', {
                title: `%${findQuery.title}%`,
            });
        }
        if (findQuery.number) {
            queryBuilder.andWhere('qa.number LIKE :number', {
                number: `%${findQuery.number}%`,
            });
        }
        if (findQuery.createdDate ) {
            queryBuilder.andWhere('qa.createdDate >= :createdDate', {
                createdDate: `${findQuery.createdDate}`,
            });
        }
        if (findQuery.modifiedDate ) {
            queryBuilder.andWhere('qa.modifiedDate <= :modifiedDate', {
                modifiedDate: `${findQuery.modifiedDate}`,
            });
        }

        return await queryBuilder.getManyAndCount();
    }
}
