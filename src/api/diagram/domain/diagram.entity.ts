// ** Typeorm Imports
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';

@Entity({ name: 'TB_DIAGRAM' })
export default class Diagram extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
