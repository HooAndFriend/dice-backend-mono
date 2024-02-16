// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import AuthorityRepository from '../repository/authority.repository';
import AdminRepository from '../../admin/repository/admin.repository';
import RequestAuthorityUpdateDto from '../dto/authority.update.dto';

// ** Utils Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class AuthorityService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly authorityRepository: AuthorityRepository,
    private readonly configService: ConfigService,
  ) {}

  public async findAuthority(id: number) {
    const authority = await this.authorityRepository.findOne({ where: { id } });

    if (!authority) {
      throw new NotFoundException('존재하지 않는 관리자입니다.');
    }

    return { authority };
  }

  public async updateAuthority(dto: RequestAuthorityUpdateDto) {
    await this.authorityRepository.update(dto.adminId, {
      dashboardYn: dto.dashboard,
      userYn: dto.user,
      inactiveUserYn: dto.inactiveUser,
      teamYn: dto.team,
      workspaceYn: dto.workspace,
      qnaYn: dto.qna,
      faqYn: dto.faq,
      programYn: dto.program,
      stateYn: dto.state,
      adminYn: dto.admin,
    });
  }
}
