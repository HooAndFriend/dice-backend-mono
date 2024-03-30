// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../global/domain/BaseTime.Entity';

@Entity({ name: 'TB_STATE' })
@Unique(['name', 'color'])
export default class State extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '이름',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 10,
    comment: '색상',
    nullable: false,
  })
  color: string;

  @Column({
    type: 'varchar',
    length: 150,
    comment: '설명',
    name: 'description',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'boolean',
    comment: '노출 여부',
    name: 'expose_yn',
    nullable: false,
  })
  exposeYn: boolean;
}
