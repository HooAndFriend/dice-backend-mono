// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Utils Imports
import axios, { AxiosInstance } from 'axios';
import { encryptUtil } from '@/src/global/util/aes';
import { CommonResponse } from '@hi-dice/common';
import { InternalResponse, UserProfile } from '../types';

@Injectable()
export default class InternalCoreSenderService {
  private coreRepository: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.coreRepository = axios.create({
      baseURL: this.configService.get('CORE_SERVER_URL') + '/api/v1',
      headers: {
        'internal-code': encryptUtil(
          this.configService.get('INTERNAL_API_KEY'),
        ),
      },
    });
  }

  /**
   * Find User Profile List
   * @param emailList
   * @returns
   */
  public async findUserProfileList(emailList: string[]) {
    const { data } = await this.coreRepository.post<
      InternalResponse<UserProfile[]>
    >('/internal/log', {
      email: emailList,
    });

    return data;
  }
}
