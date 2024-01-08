// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import { DataSource } from 'typeorm';
import QaRepository from '../repository/qa.repository';
import FileRepository from '../repository/file.repository';
import UserRepository from '@/src/api/user/repository/user.repository';
import WorkspaceRepository from '@/src/api/workspace/repository/workspace.repository';

// ** Response Imports
import CommonResponse from '../../../common/dto/api.response';

// ** enum, dto, entity, types Imports
import RequestQaSaveDto from '../dto/qa.save.dto';
import RequestQaUpdateDto from '../dto/qa.update.dto';
import User from '@/src/api/user/domain/user.entity';

@Injectable()
export default class QaService {
  constructor(
    private readonly qaRepository: QaRepository,
    private readonly fileRepository: FileRepository,
    private readonly userRepository: UserRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  public async saveQa(dto: RequestQaSaveDto) {
    const findAdmin = await this.userRepository.findOne({
      where: { id: dto.adminId },
    });
    if (!findAdmin) {
      return CommonResponse.createNotFoundException(
        '관리자를 찾을 수 없습니다.',
      );
    }
    const findWorker = await this.userRepository.findOne({
      where: { id: dto.workerId },
    });
    if (!findWorker) {
      return CommonResponse.createNotFoundException(
        '작업자를 찾을 수 없습니다.',
      );
    }
    const findWorkspace = await this.workspaceRepository.findOne({
      where: { id: dto.workspaceId },
    });
    if (!findWorkspace) {
      return CommonResponse.createNotFoundException(
        '워크 스페이스를 찾을 수 없습니다.',
      );
    }
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const files = await queryRunner.manager.save(
      dto.fileurls.map((fileURL) =>
        this.fileRepository.create({
          url: fileURL.url,
        }),
      ),
    );

    await queryRunner.manager.save(
      this.qaRepository.create({
        number: dto.number,
        title: dto.title,
        asIs: dto.asIs,
        toBe: dto.toBe,
        memo: dto.memo,
        admin: findAdmin,
        worker: findWorker,
        file: files,
        workspace: findWorkspace,
      }),
    );

    await queryRunner.commitTransaction();

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qa를 생성합니다.',
    });
  }
  public async updateQa(dto: RequestQaUpdateDto) {
    const findQa = await this.qaRepository.findOne({
      where: { id: dto.qaId },
    });
    if (!findQa) {
      return CommonResponse.createNotFoundException('QA를 찾을 수 없습니다.');
    }

    findQa.status = dto.status;
    await this.qaRepository.save(
      findQa
    );
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qa를 수정합니다.',
    });
  }
  public async deleteQa(qaId : number) {
    const findQa = await this.qaRepository.findOne({
      where: { id: qaId },
    });
    if (!findQa) {
      return CommonResponse.createNotFoundException('QA를 찾을 수 없습니다.');
    }
    await this.qaRepository.remove(
      findQa
    );
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qa를 삭제합니다.',
    });
  }
}
