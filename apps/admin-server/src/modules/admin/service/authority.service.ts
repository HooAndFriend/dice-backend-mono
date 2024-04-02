// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import AuthorityRepository from '../repository/authority.repository';

// ** Utils Imports

// ** enum, dto, entity, types Imports
import RequestAuthorityUpdateDto from '../dto/authority.update.dto';

@Injectable()
export default class AuthorityService {
  constructor(
    private readonly authorityRepository: AuthorityRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   *
   * @param id Find Authority
   * @returns
   */
  public async findAuthority(id: number) {
    const authority = await this.authorityRepository.findOne({ where: { id } });

    if (!authority) {
      throw new NotFoundException('존재하지 않는 관리자입니다.');
    }

    return { authority };
  }

  /**
   * Update Authority
   * @param dto
   */
  public async updateAuthority(dto: RequestAuthorityUpdateDto) {
    await this.authorityRepository.update(dto.id, { ...dto });
  }
}
