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
   * 에픽 조회
   */
  public async findEpicById(epicId: number): Promise<Epic> {
    const epic = await this.epicRepository.findOne({ where: { epicId } });

    if (!epic) {
      throw new NotFoundException('Not Found Epic');
    }

    return epic;
  }

  /**
   * 에픽 상세 조회
   */
  public async findEpicDetailById(epicId: number): Promise<Epic> {
    const epic = await this.epicRepository.findOneEpicById(epicId);

    if (!epic) {
      throw new NotFoundException('Not Found Epic');
    }

    return epic;
  }

  /**
   * 에픽의 정렬 순서 변경
   */
  public async updateEpicOrder(
    epic: Epic,
    targetOrderId: number,
    workspaceId: number,
  ): Promise<void> {
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

  /**
   * 에픽의 정렬 순서 변경
   */
  private async updateOrder(
    epicList: Epic[],
    isPluse: boolean,
    targetEpic: Epic,
    targetOrderId: number,
  ): Promise<void> {
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
   * 에픽 저장
   */
  public async saveEpic(
    dto: RequestEpicSaveDto,
    workspace: Workspace,
  ): Promise<void> {
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
   * 에픽 리스트 조회
   */
  public async findLessEpicList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ): Promise<Epic[]> {
    return await this.epicRepository.find({
      where: {
        orderId: Between(orderId, targetOrderId),
        workspace: { workspaceId },
      },
    });
  }

  /**
   * 에픽 수정
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
   * 에픽이 있는 지 확인합니다.
   */
  public async isExistedEpicById(epicId: number): Promise<void> {
    const epic = await this.epicRepository.exist({ where: { epicId } });

    if (!epic) {
      throw new NotFoundException('Not Found Epic');
    }
  }

  /**
   * 에픽 삭제
   */
  public async deleteEpicById(epicId: number): Promise<void> {
    await this.epicRepository.update(epicId, { isDeleted: true });
  }

  /**
   * 에픽 리스트 조회
   */
  public async findEpicList(workspaceId: number): Promise<[Epic[], number]> {
    return await this.epicRepository.findEpicList(workspaceId);
  }

  /**
   * 모든 에픽 리스트 조회
   */
  public async findAllEpic(
    workspaceId: number,
  ): Promise<{ data: any[]; count: number }> {
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
   * 에픽 리스트 조회
   */
  public async findMoreEpicList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ): Promise<Epic[]> {
    return await this.epicRepository.find({
      where: {
        orderId: Between(targetOrderId, orderId),
        workspace: { workspaceId },
      },
    });
  }
}
