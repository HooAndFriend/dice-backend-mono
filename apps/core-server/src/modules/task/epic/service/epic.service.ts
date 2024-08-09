// ** Nest Imports
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

// ** Custom Module Imports
import EpicRepository from '../repository/epic.repository';

// ** Utils Imports
import { Between, DataSource } from 'typeorm';

// ** enum, dto, entity, types Imports
import { TaskStatusEnum } from '@hi-dice/common';
import Epic from '../domain/epic.entity';
import RequestEpicSaveDto from '../dto/epic.save.dto';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import RequestEpicUpdateDto from '../dto/epic.update.dto';

@Injectable()
export default class EpicService {
  constructor(
    private readonly epicRepository: EpicRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger(EpicService.name);

  /**
   * Find Epic By Id
   * @param epicId
   * @returns
   */
  public async findEpicById(epicId: number) {
    const epic = await this.epicRepository.findOne({ where: { epicId } });

    if (!epic) {
      throw new NotFoundException('Not Found Epic');
    }

    return epic;
  }

  /**
   * Find Epic Detail By Id
   * @param epicId
   * @returns
   */
  public async findEpicDetailById(epicId: number) {
    const epic = await this.epicRepository.findOneEpicById(epicId);

    if (!epic) {
      throw new NotFoundException('Not Found Epic');
    }

    return epic;
  }

  /**
   * Update Epic Order
   * @param epic
   * @param targetOrderId
   * @param workspaceId
   */
  public async updateEpicOrder(
    epic: Epic,
    targetOrderId: number,
    workspaceId: number,
  ) {
    if (epic.orderId > targetOrderId) {
      const list = await this.findMoreEpicList(
        epic.orderId,
        targetOrderId,
        workspaceId,
      );

      await this.updateOrder(list, true, epic, targetOrderId);
    }

    if (epic.orderId < targetOrderId) {
      const list = await this.findLessEpicList(
        epic.orderId,
        targetOrderId,
        workspaceId,
      );

      await this.updateOrder(list, false, epic, targetOrderId);
    }
  }

  private async updateOrder(
    epicList: Epic[],
    isPluse: boolean,
    targetEpic: Epic,
    targetOrderId: number,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for await (const item of epicList) {
        isPluse
          ? (item.orderId = item.orderId + 1)
          : (item.orderId = item.orderId - 1);

        await queryRunner.manager.save(item);
      }
      targetEpic.orderId = targetOrderId;
      queryRunner.manager.save(targetEpic);

      queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  /**
   * Save Epic
   * @param dto
   * @param workspaceId
   * @param user
   */
  public async saveEpic(dto: RequestEpicSaveDto, workspace: Workspace) {
    const epicCount =
      (await this.epicRepository.count({
        where: { workspace: { workspaceId: workspace.workspaceId } },
      })) + 1;
    const epicCode = workspace.code + '-' + epicCount;

    await this.epicRepository.save(
      this.epicRepository.create({
        name: dto.name,
        workspace: workspace,
        code: epicCode,
        orderId: epicCount,
        content: '',
      }),
    );
  }

  /**
   * Find More Epic List
   * @param orderId
   * @param workspaceId
   * @returns
   */
  public async findLessEpicList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ) {
    return await this.epicRepository.find({
      where: {
        orderId: Between(orderId, targetOrderId),
        workspace: { workspaceId },
      },
    });
  }

  /**
   * Update Epic
   * @param dto
   */
  public async updateEpic(
    epic: Epic,
    dto: RequestEpicUpdateDto,
  ): Promise<void> {
    epic.changeContent(dto.name, dto.content);
    this.epicRepository.save(epic);
  }

  /**
   * 에픽 조회
   */
  public async findOne(epicId: number): Promise<Epic> {
    const epic = await this.epicRepository.findOne({ where: { epicId } });

    if (!epic) {
      throw new NotFoundException('Not Found Epic');
    }

    return epic;
  }

  /**
   * Find Epic By Id
   * @param epicId
   */
  public async isExistedEpicById(epicId: number) {
    const epic = await this.epicRepository.exist({ where: { epicId } });

    if (!epic) {
      throw new NotFoundException('Not Found Epic');
    }
  }

  /**
   * Delete Epic
   * @param epicId
   */
  public async deleteEpicById(epicId: number) {
    await this.epicRepository.update(epicId, { isDeleted: true });
  }

  /**
   * Find Epic List
   * @param workspaceId
   * @returns
   */
  public async findEpicList(workspaceId: number) {
    return await this.epicRepository.findEpicList(workspaceId);
  }

  /**
   * Find All epic
   * @param id
   */
  public async findAllEpic(workspaceId: number) {
    const [data, count] = await this.epicRepository.findAllByWorkspaceId(
      workspaceId,
    );

    return {
      data: data.map((item) => ({
        ...item,
        doneTicketCount: item.ticket.filter(
          (item) => item.status === TaskStatusEnum.COMPLETE,
        ).length,
      })),
      count,
    };
  }

  /**
   * Find Less Epic List
   * @param orderId
   * @param workspaceId
   * @returns
   */
  public async findMoreEpicList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ) {
    return await this.epicRepository.find({
      where: {
        orderId: Between(targetOrderId, orderId),
        workspace: { workspaceId },
      },
    });
  }
}
