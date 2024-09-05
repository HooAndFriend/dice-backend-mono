// ** Nest Imports
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import StateRepository from '../repository/state.repository';
import RequestStateSaveDto from '../dto/state.save.dto';
import RequestStateUpdateDto from '../dto/state.update.dto';
import { Not } from 'typeorm';
import { RequestPagingDto } from '@hi-dice/common';

// ** Utils Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class StateService {
  constructor(
    private readonly stateRepository: StateRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * State를 저장합니다.
   */
  public async saveState(dto: RequestStateSaveDto) {
    await this.stateRepository.save(
      this.stateRepository.create({
        ...dto,
      }),
    );
  }

  /**
   * State 리스트를 조회합니다.
   */
  public async findStateList(dto: RequestPagingDto) {
    return await this.stateRepository.findStateList(dto);
  }

  /**
   * State를 조회합니다.
   */
  public async findState(id: number) {
    const state = await this.stateRepository.findOne({ where: { id } });

    if (!state) {
      throw new BadRequestException('존재하지 않는 상태값입니다.');
    }

    return state;
  }

  /**
   * State를 삭제합니다.
   */
  public async deleteState(id: number) {
    await this.stateRepository.delete(id);
  }

  /**
   * State를 수정합니다.
   */
  public async updateState(dto: RequestStateUpdateDto) {
    const isDuplicateName = await this.stateRepository.findOne({
      where: { name: dto.name, id: Not(dto.id) },
    });

    if (isDuplicateName) {
      throw new BadRequestException(
        '동일한 이름을 가진 다른 상태가 이미 존재합니다.',
      );
    }

    await this.stateRepository.update(dto.id, {
      ...dto,
    });
  }

  /**
   * State가 존재하는지 확인합니다.
   */
  public async existedState(name: string) {
    const existedState = await this.stateRepository.exist({
      where: { name },
    });

    if (existedState) {
      throw new BadRequestException('이미 존재하는 상태값입니다.');
    }
  }

  /**
   * State가 존재하는지 id로 확인합니다.
   */
  public async existedStateById(id: number) {
    const existedState = await this.stateRepository.exist({
      where: { id },
    });

    if (!existedState) {
      throw new BadRequestException('존재하지 않는 상태값입니다.');
    }
  }
}
