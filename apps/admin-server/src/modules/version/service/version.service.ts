// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import VersionRepository from '../repository/version.repository';
import RequestVersionSaveDto from '../dto/version.save.dto';
import { BadRequestException } from '@/src/global/exception/CustomException';
import RequestPagingDto from '@/src/global/dto/paging.dto';

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
