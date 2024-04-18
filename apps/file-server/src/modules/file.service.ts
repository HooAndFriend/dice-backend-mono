// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** AWS Imports
import AWS from 'aws-sdk';

@Injectable()
export default class FileService {
  private readonly s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      endpoint: 'http://125.133.34.224:9000',
      accessKeyId: this.configService.get<string>('MINIO_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('MINIO_SECRET_KEY'),
      s3ForcePathStyle: true,
    });
  }

  /**
   * Upload File
   * @param file
   * @returns
   */
  public async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: 'file',
      Key: file.originalname,
      Body: file.buffer,
    };

    const response = await this.s3.upload(params).promise();

    return {
      ...response,
      url: this.configService.get<string>('MINIO_HOST') + '/' + response.Key,
    };
  }
}
