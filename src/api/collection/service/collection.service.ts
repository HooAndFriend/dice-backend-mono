// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import CollectionRepository from '../repository/collection.repository';

// Other Imports

@Injectable()
export default class CollectionService {
  constructor(
    private readonly collectionRepository: CollectionRepository,
    private readonly configService: ConfigService,
  ) {}
}
