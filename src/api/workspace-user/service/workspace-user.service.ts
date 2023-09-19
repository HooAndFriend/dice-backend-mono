// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import WorkspaceUserRepository from '../repository/workspace-user.repository';
import User from 'src/api/user/domain/user.entity';
import CommonResponse from 'src/common/dto/api.response';
import RequestWorkspaceUpdateUpdateDto from '../dto/workspace-user.update.dto';
import { NotFoundException } from 'src/exception/customException';

// Other Imports

@Injectable()
export default class WorkspaceUserService {
  constructor(
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async findWorkspaceList(user: User) {
    const [data, count] = await this.workspaceUserRepository.findWorkspaceList(
      user.id,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '워크스페이스를 조회합니다.',
      data: { data, count },
    });
  }

  public async updateWorksapceUserRole(dto: RequestWorkspaceUpdateUpdateDto) {
    const findWorkspaceUser = await this.workspaceUserRepository.findOne({
      where: { id: dto.id },
    });

    if (!findWorkspaceUser) {
      throw new NotFoundException(
        '워크스페이스에서 유저의 정보를 찾을 수 없습니다.',
      );
    }

    await this.workspaceUserRepository.update(dto.id, { role: dto.role });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '워크스페이스에서 유저의 권한을 수정합니다.',
    });
  }
}
