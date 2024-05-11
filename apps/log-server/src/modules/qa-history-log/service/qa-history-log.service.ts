// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import QaHistoryLogRepository from '../repository/qa-history-log.repository';

// ** Dto Imports
import { RequestQaHistoryLogSaveDto } from '@hi-dice/common';
import InternalCoreSenderService from '../../internal/internal-core/service/internal-core.sender.service';

@Injectable()
export default class QaHistoryLogService {
  constructor(
    private readonly qaHistoryLogRepository: QaHistoryLogRepository,
    private readonly internalCoreSendService: InternalCoreSenderService,
  ) {}

  /**
   * Save Qa History Log
   * @param dto
   */
  public async saveQaHistoryLog(dto: RequestQaHistoryLogSaveDto) {
    await this.qaHistoryLogRepository.save(
      this.qaHistoryLogRepository.create({
        ...dto,
      }),
    );
  }

  /**
   * Find Qa History List
   * @param qaId
   * @returns
   */
  public async findQaHistoryList(qaId: number) {
    const [data, count] = await this.qaHistoryLogRepository.findAndCount({
      where: {
        qaId,
      },
      order: { createdDate: 'DESC' },
    });

    if (count < 1) {
      return [data, count];
    }

    const userList = await this.findUserProfileList(
      data.map((item) => item.email),
    );

    return [
      data.map((item) => ({
        ...item,
        user: userList.find((_) => _.email === item.email) || null,
      })),
      count,
    ];
  }

  /**
   * find User Profile List
   * @param emailList
   * @returns
   */
  private async findUserProfileList(emailList: string[]) {
    const { data } = await this.internalCoreSendService.findUserProfileList(
      emailList,
    );

    return data;
  }
}
