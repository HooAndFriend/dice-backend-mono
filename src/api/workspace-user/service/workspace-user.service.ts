// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import WorkspaceUserRepository from '../repository/workspace-user.repository';
import User from 'src/api/user/domain/user.entity';
import CommonResponse from 'src/common/dto/api.response';

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

    return CommonResponse.of({
      statusCode: 200,
      message: '워크스페이스를 조회합니다.',
      data: { data, count },
    });
  }
}
