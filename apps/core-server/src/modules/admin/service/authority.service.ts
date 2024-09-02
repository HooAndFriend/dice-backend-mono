// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import AuthorityRepository from '../repository/authority.repository';

// ** enum, dto, entity, types Imports
import RequestAuthorityUpdateDto from '../dto/authority.update.dto';
import Authority from '../domain/authority.entity';
import { NotFoundException } from '@/src/global/exception/CustomException';

@Injectable()
export default class AuthorityService {
  constructor(
    private readonly authorityRepository: AuthorityRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 관리자 권한 조회
   */
  public async findOne(authorityId: number): Promise<Authority> {
    const authority = await this.authorityRepository.findOne({
      where: { authorityId },
    });

    if (!authority) {
      throw new NotFoundException('존재하지 않는 관리자입니다.');
    }

    return authority;
  }

  /**
   * 관리자 권한 수정
   */
  public async updateAuthority(dto: RequestAuthorityUpdateDto): Promise<void> {
    await this.authorityRepository.update(dto.authorityId, { ...dto });
  }
}
