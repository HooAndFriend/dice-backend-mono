// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import VersionRepository from '../repository/version.repository';

// ** enum, dto, entity, types Imports
import VersionTypeEnum from '../domain/version-type.enum';
import { BadRequestException } from '@/src/global/exception/CustomException';
import Version from '../domain/version.entity';

@Injectable()
export default class VersionService {
  constructor(private readonly versionRepository: VersionRepository) {}

  /**
   * 해당 Type의 최신 버전을 조회합니다.
   */
  public async findLastestVesrion(type: VersionTypeEnum): Promise<Version> {
    const latestVersion = await this.versionRepository.findOne({
      where: { type },
      order: { version: 'DESC' },
    });

    if (!latestVersion) {
      throw new BadRequestException('해당 type 버전이 없습니다.');
    }

    return latestVersion;
  }
}
