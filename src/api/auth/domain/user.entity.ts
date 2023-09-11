// ** Typeorm Imports
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from 'src/common/entity/BaseTime.Entity';
import { UserRole } from '../dto/user.role';
import { Exclude } from 'class-transformer';

@Entity({ name: 'tbl_user' })
@Unique(['email'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @Column({ type: 'enum', enum: UserRole })
  private _role: UserRole;
  public get role(): UserRole {
    return this._role;
  }
  public set role(value: UserRole) {
    this._role = value;
  }
}
