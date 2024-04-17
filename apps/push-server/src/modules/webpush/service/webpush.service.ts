// ** Nest Imports

import { Injectable } from '@nestjs/common';

// ** Utils Imports
import admin from 'firebase-admin';

// ** enum, dto, entity, types Imports
import { BadRequestException } from '@/src/global/exception/CustomException';
import * as serviceAccount from '@/src/firebase-config.json';
import SendPushDto from '../dto/push.send';
import SendMultiPushDto from '../dto/push-multi.send';

@Injectable()
export default class WebPushService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  /**
   * Send Single Push Message
   * @param dto
   */
  public async sendPushMessage(dto: SendPushDto) {
    const message = {
      notification: {
        title: dto.title,
        body: dto.body,
      },

      token: dto.fcmToken,
    };

    try {
      await admin.messaging().send(message);
    } catch (error) {
      throw new BadRequestException('Failed to send message');
    }
  }

  /**
   * Send Multiple Push Message
   * @param dto
   */
  public async sendPushMessageToMultiple(dto: SendMultiPushDto) {
    const message = {
      notification: {
        title: dto.title,
        body: dto.body,
      },

      tokens: dto.fcmToken,
    };

    try {
      await admin.messaging().sendEachForMulticast(message);
    } catch (error) {
      throw new BadRequestException('Failed to send message');
    }
  }
}
