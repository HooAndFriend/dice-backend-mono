// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import FileRepository from '../repository/qa.file.repository';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@hi-dice/common';
import Qa from '@/src/modules/qa/domain/qa.entity';
import RequestQaFileSaveDto from '../dto/qa-file.save.dto';

@Injectable()
export default class QaFileService {
  constructor(private readonly fileRepository: FileRepository) {}

  private logger = new Logger(QaFileService.name);

  /**
   * Save Qa File
   * @param qa
   * @param dto
   */
  public async saveQaFile(qa: Qa, dto: RequestQaFileSaveDto) {
    await this.fileRepository.save(
      this.fileRepository.create({
        url: dto.url,
        qa,
      }),
    );
  }

  /**
   * Delete Qa File By Id
   * @param qaFileId
   */
  public async deleteQaFile(qaFileId: number) {
    await this.fileRepository.delete(qaFileId);
  }

  /**
   * Find Qa File By Id
   * @param qaFileId
   * @returns
   */
  public async findQaFile(qaFileId: number) {
    const qaFile = await this.fileRepository.findOne({
      where: { id: qaFileId },
      relations: ['qa'],
    });

    if (!qaFile) {
      throw new NotFoundException('Not Found Qa File');
    }

    return qaFile;
  }

  /**
   * Existed Qa By Id
   * @param qaId
   */
  public async isExistedFileById(fileId: number) {
    const qaFile = await this.fileRepository.exist({
      where: { id: fileId },
    });

    if (!qaFile) {
      throw new NotFoundException('Not Found File');
    }
  }
}
