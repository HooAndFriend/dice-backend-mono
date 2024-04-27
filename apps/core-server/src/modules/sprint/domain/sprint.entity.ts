// ** Typeorm Imports
import {
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  // ** enum, dto, entity Imports
  import { BaseTimeEntity } from '@repo/common';
  
  @Entity({ name: 'TB_SPRINT' })
  export default class Sprint extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;
  }
  