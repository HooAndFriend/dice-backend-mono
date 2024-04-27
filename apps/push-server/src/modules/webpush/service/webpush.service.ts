// ** Nest Imports

import { Injectable } from '@nestjs/common';

// ** Utils Imports
// import admin from 'firebase-admin';

// ** enum, dto, entity, types Imports
import { BadRequestException } from '@repo/common';
import * as serviceAccount from '../../../firebase-config.json';
import { SendPushDto } from '@repo/common';
import SendMultiPushDto from '../dto/push-multi.send';

@Injectable()
export default class WebPushService {
  // constructor() {
  //   admin.initializeApp({
  //     credential: admin.credential.cert(serviceAccount as any),
  //   });
  // }
  // /**
  //  * Send Single Push Message
  //  * @param dto
  //  */
  // public async sendPushMessage(title: string, body: string, token: string) {
  //   const message = {
  //     notification: {
  //       title,
  //       body,
  //     },
  //     token,
  //   };
  //   try {
  //     await admin.messaging().send(message);
  //   } catch (error) {
  //     throw new BadRequestException('Failed to send message');
  //   }
  // }
  // /**
  //  * Send Multiple Push Message
  //  * @param dto
  //  */
  // public async sendPushMessageToMultiple(
  //   title: string,
  //   body: string,
  //   tokens: string[],
  // ) {
  //   const message = {
  //     notification: {
  //       title,
  //       body,
  //     },
  //     tokens,
  //   };
  //   try {
  //     await admin.messaging().sendEachForMulticast(message);
  //   } catch (error) {
  //     throw new BadRequestException('Failed to send message');
  //   }
  // }
}
