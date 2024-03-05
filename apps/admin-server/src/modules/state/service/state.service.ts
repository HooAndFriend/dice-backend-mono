// ** Nest Imports
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import StateRepository from '../repository/state.repository';
import RequestStateSaveDto from '../dto/state.save.dto';
import RequestStateUpdateDto from '../dto/state.update.dto';
import { Not } from 'typeorm';
import RequestPagingDto from '@/src/global/dto/paging.dto';

// ** Utils Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class StateService {
  constructor(
    private readonly stateRepository: StateRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Save State
   * @param dto
   */
  public async saveState(dto: RequestStateSaveDto) {
    await this.stateRepository.save(
      this.stateRepository.create({
        ...dto,
      }),
    );
  }

  /**
   * Find State List
   * @param dto
   * @returns
   */
  public async findStateList(dto: RequestPagingDto) {
    return await this.stateRepository.findStateList(dto);
  }

  /**
   *
   * @param id Find State
   * @returns
   */
  public async findState(id: number) {
    const state = await this.stateRepository.findOne({ where: { id } });

    if (!state) {
      throw new BadRequestException('존재하지 않는 상태값입니다.');
    }

    return state;
  }

  /**
   * Delete State
   * @param id
   */
  public async deleteState(id: number) {
    await this.stateRepository.delete(id);
  }

  /**
   * Update State
   * @param dto
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
   * Existed State
   * @param name
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
   * Existed State By Id
   * @param id
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
