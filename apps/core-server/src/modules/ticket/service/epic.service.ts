// ** Nest Imports
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Between, DataSource } from 'typeorm';

// ** Custom Module Imports
import EpicRepository from '../repository/epic.repository';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@/src/global/exception/CustomException';
import Epic from '../domain/epic.entity';
import RequestEpicSaveDto from '../dto/epic/epic.save.dto';
import Workspace from '../../workspace/domain/workspace.entity';
import User from '../../user/domain/user.entity';
import RequestEpicUpdateDto from '../dto/epic/epic.update.dto';
import RequestEpicDueDateUpdateDto from '../dto/epic/epic-duedate.dto';
import RequestEpicFindDto from '../dto/epic/epic.find.dto';
import { TaskStatusEnum } from '@/src/global/enum/TaskStatus.enum';

@Injectable()
export default class EpicService {
  constructor(
    private readonly configService: ConfigService,
    private readonly epicRepository: EpicRepository,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger(EpicService.name);

  /**
   * Find Epic By Id
   * @param epicId
   * @returns
   */
  public async findEpicById(epicId: number) {
    const epic = await this.epicRepository.findOne({ where: { id: epicId } });

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
  public async saveEpic(
    dto: RequestEpicSaveDto,
    workspace: Workspace,
    user: User,
  ) {
    const epicCount =
      (await this.epicRepository.count({
        where: { workspace: { id: workspace.id } },
      })) + 1;
    const epicCode = workspace.code + '-' + epicCount;

    await this.epicRepository.save(
      this.epicRepository.create({
        admin: user,
        name: dto.name,
        workspace: workspace,
        code: epicCode,
        orderId: epicCount,
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
        workspace: { id: workspaceId },
      },
    });
  }

  /**
   * Update Epic
   * @param dto
   */
  public async updateEpic(dto: RequestEpicUpdateDto) {
    await this.epicRepository.update(dto.epicId, {
      name: dto.name,
    });
  }

  /**
   * Find Epic By Id
   * @param epicId
   */
  public async isExistedEpicById(epicId: number) {
    const epic = await this.epicRepository.exist({ where: { id: epicId } });

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
   * Find All epic
   * @param id
   */
  public async findAllEpic(id: number, dto: RequestEpicFindDto) {
    const [data, count] = await this.epicRepository.findAllByWorkspaceId(
      id,
      dto,
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
   * Update Epic Due Date
   * @param dto
   */
  public async updateEpicDueDate(dto: RequestEpicDueDateUpdateDto) {
    await this.epicRepository.update(dto.epicId, { dueDate: dto.dueDate });
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
        workspace: { id: workspaceId },
      },
    });
  }
}
