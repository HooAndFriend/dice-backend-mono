// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import { BaseCreatedTimeEntity } from '@hi-dice/common';
import VersionTypeEnum from './version-type.enum';

@Entity({ name: 'TB_FILE_DOWNLOAD_LOG' })
export default class FileDownloadLog extends BaseCreatedTimeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'enum',
    comment: '다운로드 종류',
    enum: VersionTypeEnum,
    nullable: false,
  })
  type: VersionTypeEnum;

  @Column({
    type: 'varchar',
    length: 30,
    comment: 'IP',
    name: 'ip',
    nullable: false,
  })
  ip: string;
}
