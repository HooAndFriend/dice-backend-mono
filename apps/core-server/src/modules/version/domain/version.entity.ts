// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import VersionTypeEnum from './version-type.enum';

@Entity({ name: 'TB_VERSION' })
export default class Version extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  private _version: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '버전명',
    nullable: false,
  })
  get version(): string {
    return this._version;
  }

  set version(value: string) {
    if (/^\d+(\.\d+)*$/.test(value)) {
      this._version = value;
    } else {
      throw new Error('버전명은 숫자와 .만 이용해서 작성 가능합니다.');
    }
  }

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
