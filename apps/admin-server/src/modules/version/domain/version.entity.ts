// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../global/domain/BaseTime.Entity';
import VersionTypeEnum from './version-type.enum';

@Entity({ name: 'TB_VERSION' })
export default class Version extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '버전명',
    nullable: false,
  })
  version: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '프로그램 파일',
    nullable: false,
  })
  program: string;

  @Column({
    type: 'enum',
    enum: VersionTypeEnum,
    comment: '버전 종류',
    nullable: false,
  })
  type: VersionTypeEnum;

  @Column({
    type: 'text',
    comment: '메모',
    nullable: false,
  })
  memo: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '생성자 ID',
    nullable: false,
  })
  createdId: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '수정자 ID',
    nullable: false,
  })
  modifiedId: string;
}
