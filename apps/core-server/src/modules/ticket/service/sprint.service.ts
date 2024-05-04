// ** Nest Imports
import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

// ** Custom Module Imports
import SprintRepository from '../repository/sprint.repository';

// ** enum, dto, entity, types Imports
import RequestSprintSaveDto from '../dto/sprint/sprint.save.dto';
import RequestSprintUpdateInfoDto from '../dto/sprint/sprint.update.info.dto';
import Workspace from '../../workspace/domain/workspace.entity';

@Injectable()
export default class SprintService {
  constructor(private readonly sprintRepository: SprintRepository) {}

  /**
   * Save Sprint
   * @param dto
   * @param Workspace
   */
  public async saveSprint(dto: RequestSprintSaveDto, workspace: Workspace) {
    const orderId = await this.sprintRepository.count({
      where: {
        workspace: { id: workspace.id },
      },
    });

    await this.sprintRepository.save({
      name: dto.sprintName,
      workspace: workspace,
      orderId: orderId + 1,
    });
  }

  /**
   * Find Sprint
   * @param sprintId
   * @param workspaceId
   */
  public async findSprint(sprintId: number, workspaceId: number) {
    const findSprint = await this.sprintRepository.findOne({
      where: {
        id: sprintId,
        workspace: { id: workspaceId },
      },
    });

    if (!findSprint) {
      throw new NotFoundException('Not Found Sprint');
    }

    return findSprint;
  }

  /**
   * Update Sprint
   * @param dto
   * @param workspace
   */
  public async updateSprintInfo(
    dto: RequestSprintUpdateInfoDto,
    workspace: Workspace,
  ) {
    const findSprint = await this.findSprint(dto.sprintId, workspace.id);

    if (!findSprint) {
      throw new NotFoundException('Not Found Sprint');
    }
    findSprint.name = dto.name;
    findSprint.startDate = new Date(dto.startDate);
    findSprint.endDate = new Date(dto.endDate);

    await this.sprintRepository.save(findSprint);
  }

  /**
   * Delete Sprint
   * @param sprintId
   */
  public async deleteSprint(sprintId: number) {
    await this.sprintRepository.delete(sprintId);
  }
}
