// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports
import CommonResponse from '../../../common/dto/api.response';
import RequestWorkspaceUpdateUpdateDto from '../dto/workspace-user.update.dto';

// ** Custom Module Imports
import WorkspaceUserRepository from '../repository/workspace-user.repository';

@Injectable()
export default class WorkspaceUserService {
  constructor(
    private readonly workspaceUserRepository: WorkspaceUserRepository,

    private readonly configService: ConfigService,
  ) {}

  public async updateWorksapceUserRole(dto: RequestWorkspaceUpdateUpdateDto) {
    const findWorkspaceUser = await this.workspaceUserRepository.findOne({
      where: { id: dto.id },
    });

    if (!findWorkspaceUser) {
      return CommonResponse.createNotFoundException(
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
