// ** Nest Imports
import {HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import { Admin, DataSource } from 'typeorm';
import QaRepository from '../repository/qa.repository';
import FileRepository from '../repository/file.repository';
import UserRepository from '@/src/modules/user/repository/user.repository';
import WorkspaceRepository from '@/src/modules/workspace/repository/workspace.repository';
import WorkspaceUserRepository from '../../workspace-user/repository/workspace-user.repository';

// ** Response Imports
import CommonResponse from '../../../global/dto/api.response';

// ** enum, dto, entity, types Imports
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '../../../global/exception/CustomException';
import RequestQaSaveDto from '../dto/qa.save.dto';
import RequestQaUpdateDto from '../dto/qa.update.dto';
import RequestQaStatusUpdateDto from '../dto/qa.status.update.dto';
import RequestQaFindDto from '../dto/qa.find.dto';
import Qa from '@/src/modules/qa/domain/qa.entity';
import { QaStatus } from '../../../global/enum/QaStatus.enum';
import User from '../../user/domain/user.entity';
import Workspace from '../../workspace/domain/workspace.entity';

@Injectable()
export default class QaService {
  constructor(
    private readonly qaRepository: QaRepository,
    private readonly fileRepository: FileRepository,
    private readonly userRepository: UserRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly dataSource: DataSource,
  ) {}

  public async findQaList(workspaceId: number, findQuery: RequestQaFindDto) {
    const findWorkspace = await this.workspaceRepository.findOne({
      where: { id: workspaceId },
    });
    if (!findWorkspace) {
      throw new NotFoundException('Not Found Workspace');
    }
    const [qa, count] = await this.qaRepository.findQaList(
      workspaceId,
      findQuery,
    );
    return {qa, count}
  }

  public async saveQa(dto: RequestQaSaveDto, workspaceId : number) {
    const findAdmin = await this.userRepository.findOne({
      where : { email : dto.adminId }
    });
    await this.validationQaUser(findAdmin, workspaceId);

    const findWorker = await this.userRepository.findOne({
      where : { email : dto.workerId }
    });
    await this.validationQaUser(findWorker, workspaceId);

    const workspace = await this.workspaceRepository.findWorkspace(workspaceId);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
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
          workspace: workspace,
        }),
      );
  
      await queryRunner.commitTransaction();
    }
    catch (error){
      console.log(error);
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
    finally{
      await queryRunner.release();
    }
    return;
  }
  public async updateQa(dto: RequestQaUpdateDto, workspaceId : number) {
    const findQa = await this.qaRepository.findOne({
      where: { id: dto.qaId, workspace : { id : workspaceId } },
    });
    if (!findQa) {
      throw new NotFoundException('Not Found Qa');
    }
    const findWorker = await this.userRepository.findOne({
      where: { id: dto.workerId },
    });
    await this.validationQaUser(findWorker, workspaceId);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
      const files = await queryRunner.manager.save(
        dto.fileurls.map((fileURL) =>
          this.fileRepository.create({
            url: fileURL.url,
          }),
        ),
      );
  
      findQa.updateQaFromDto(dto, findWorker, files);
  
      await queryRunner.manager.save(Qa, findQa);
  
      await queryRunner.commitTransaction();
    }
    catch (error){
      console.log(error);
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
    finally{
      await queryRunner.release();
    }
    return
  }
  public async updateQaStatus(dto: RequestQaStatusUpdateDto, workspaceId : number) {
    const findQa = await this.qaRepository.findOne({
      where: { id: dto.qaId, workspace : { id: workspaceId}},
    });
    if (!findQa) {
      throw new NotFoundException('Not Found Qa');
    }

    findQa.status = dto.status;
    await this.qaRepository.save(findQa);

    return
  }
  public async deleteQa(qaId: number, workspaceId : number) {
    const findQa = await this.qaRepository.findOne({
      where: { id: qaId, workspace : {id : workspaceId}},
    });
    if (!findQa) {
      throw new NotFoundException('Not Found Qa');
    }
    await this.qaRepository.remove(findQa);
    return 
  }
  // workspace 소속 확인
  public async validationQaUser(user: User, workspaceId: number) {
    if(!user) {
      throw new NotFoundException('Not Found User')
    }
    const findworkspaceUser = await this.workspaceUserRepository.findOne({
      where: {
        workspace: { id: workspaceId },
        teamUser: { user: { id : user.id } },
      }
    });
    console.log(user);
    if (!findworkspaceUser) {
      throw new BadRequestException('User is not in the workspace');
    }
  }
}
