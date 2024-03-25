// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import VersionRepository from '../repository/version.repository';
import RequestVersionSaveDto from '../dto/version.save.dto';
import { BadRequestException } from '@/src/global/exception/CustomException';
import RequestPagingDto from '@/src/global/dto/paging.dto';
import RequestVersionUpdateDto from '../dto/version.update.dto';
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
   * Save Version
   * @param dto
   * @param adminEmail
   */
  public async saveVersion(dto: RequestVersionSaveDto, adminEmail: string) {
    await this.versionRepository.save(
      this.versionRepository.create({
        ...dto,
        createdId: adminEmail,
        modifiedId: adminEmail,
      }),
    );
  }

  /**
   * Update Version
   * @param dto
   * @param adminEmail
   */
  public async updateVersion(dto: RequestVersionUpdateDto, adminEmail: string) {
    await this.versionRepository.update(dto.versionId, {
      version: dto.version,
      memo: dto.memo,
      program: dto.program,
      type: dto.type,
      modifiedId: adminEmail,
    });
  }

  /**
   * Find Version List
   * @param dto
   * @returns
   */
  public async findVersionList(dto: RequestPagingDto) {
    return await this.versionRepository.findVersionList(dto);
  }

  /**
   * Existed Version
   * @param version
   */
  public async existedVersion(version: string) {
    const existedVersion = await this.versionRepository.exist({
      where: { version },
    });

    if (existedVersion) {
      throw new BadRequestException('이미 존재하는 버전입니다.');
    }
  }

  /**
   * Find Version
   * @param id
   * @returns
   */
  public async findVersion(id: number) {
    const version = await this.versionRepository.findOne({ where: { id } });
    if (!version) {
      throw new BadRequestException('존재하지 않는 버전입니다.');
    }

    return version;
  }

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

  /**
   * Delete Version
   * @param id
   */
  public async deleteVersion(id: number) {
    await this.versionRepository.delete(id);
  }

  /**
   * Existed Version By Id
   * @param id
   */
  public async existedVersionById(id: number) {
    const existedVersion = await this.versionRepository.exist({
      where: { id },
    });

    if (!existedVersion) {
      throw new BadRequestException('존재하지 않는 버전입니다.');
    }
  }
}
