// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import VersionRepository from '../repository/version.repository';
import { BadRequestException } from '@/src/global/exception/CustomException';

// ** enum, dto, entity, types Imports
import VersionTypeEnum from '../domain/version-type.enum';
import Version from '../domain/version.entity';
import RequestVersionSaveDto from '../dto/version.save.dto';
import RequestVersionUpdateDto from '../dto/version.update.dto';
import { RequestPagingDto } from '@hi-dice/common';

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

  /**
   * 버전을 저장합니다.
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
   * 버전을 수정합니다.
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
   * 버전 리스트를 조회합니다.
   */
  public async findVersionList(dto: RequestPagingDto) {
    return await this.versionRepository.findVersionList(dto);
  }

  /**
   * 버전이 존재하는지 확인합니다.
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
   * 버전을 조회합니다.
   */
  public async findVersion(versionId: number) {
    const version = await this.versionRepository.findOne({
      where: { versionId: versionId },
    });
    if (!version) {
      throw new BadRequestException('존재하지 않는 버전입니다.');
    }

    return version;
  }

  /**
   * 버전을 삭제합니다.
   */
  public async deleteVersion(versionId: number) {
    await this.versionRepository.delete(versionId);
  }

  /**
   * 버전이 존재하는지 id로 확인합니다.
   */
  public async existedVersionById(versionId: number) {
    const existedVersion = await this.versionRepository.exist({
      where: { versionId: versionId },
    });

    if (!existedVersion) {
      throw new BadRequestException('존재하지 않는 버전입니다.');
    }
  }
}
