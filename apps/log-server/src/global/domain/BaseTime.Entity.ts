// ** Typeorm Imports
import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class BaseTimeEntity extends BaseEntity {
  @CreateDateColumn({ name: 'created_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedAt: Date;
}
