// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports
import User from '../../../api/user/domain/user.entity';
import CommonResponse from '../../../common/dto/api.response';
import RequestWorkspaceUpdateUpdateDto from '../dto/workspace-user.update.dto';

// ** Custom Module Imports
import WorkspaceUserRepository from '../repository/workspace-user.repository';

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

    // ** 개인 워크스페이스 처리
    const response = data.map((item) => {
      if (item.workspace.isPersonal) {
        return {
          ...item,
          workspace: {
            id: item.workspace.id,
            name: user.nickname,
            profile: user.profile,
            isPersonal: item.workspace.isPersonal,
          },
        };
      }

      return item;
    });

    return CommonResponse.createPaginationResponse({
      statusCode: 200,
      message: '워크스페이스를 조회합니다.',
      data: response,
      count,
    });
  }

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
