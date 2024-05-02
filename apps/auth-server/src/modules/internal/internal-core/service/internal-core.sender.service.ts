// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Utils Imports
import axios, { AxiosInstance } from 'axios';
@Injectable()
export default class InternalCoreSenderService {
  private coreRepository: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.coreRepository = axios.create({
      baseURL: this.configService.get('CORE_SERVER_URL'),
    });
  }
}
