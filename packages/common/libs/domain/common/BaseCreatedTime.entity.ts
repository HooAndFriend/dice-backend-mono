// ** Typeorm Imports
import { BaseEntity, CreateDateColumn } from 'typeorm';

export abstract class BaseCreatedTimeEntity extends BaseEntity {
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
