// ** Nest Imports
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import VersionRepository from '../repository/version.repository';
import VersionTypeEnum from '../domain/version-type.enum';

// ** Utils Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class VersionService {
  constructor(
    private readonly versionRepository: VersionRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Find Lastest Version
   * @param type
   * @returns
   */
  public async findLastestVesrion(type: VersionTypeEnum) {
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
