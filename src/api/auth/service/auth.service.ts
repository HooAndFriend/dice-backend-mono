// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import UserRepository from '../../user/repository/user.repository';

// ** enum, dto, entity, types Imports
import RequestUserSaveDto from '../dto/user.save.dto';
import {
  BadRequestException,
  NotFoundException,
} from 'src/exception/customException';
import { JwtPayload } from 'src/types';
import { UserRole } from '../dto/user.role';
import CommonResponse from 'src/common/dto/api.response';
import RequestUserLoginDto from '../dto/user.login.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async saveUser(dto: RequestUserSaveDto) {
    const findUser = await this.userRepository.findOne({
      where: { token: dto.token },
    });

    if (findUser) {
      return new BadRequestException('이미 회원가입한 유저 입니다.');
    }

    const saveUser = await this.userRepository.save(
      this.userRepository.create({
        token: dto.token,
        nickname: dto.nickname,
        type: dto.type,
      }),
    );

    const token = this.generateToken({ id: saveUser.id });

    return CommonResponse.of({
      statusCode: 200,
      message: '회원가입 했습니다.',
      data: token,
    });
  }

  public async loginUser(dto: RequestUserLoginDto) {
    const findUser = await this.userRepository.findOne({
      where: { token: dto.token },
    });

    if (!findUser) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    const token = this.generateToken({ id: findUser.id });

    return CommonResponse.of({
      statusCode: 200,
      message: '로그인에 성공했습니다.',
      data: token,
    });
  }

  private generateToken(payload: JwtPayload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      }),
    };
  }

  public async findUserByJwt({ id }: JwtPayload): Promise<any> {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return findUser;
  }

  public async findRefreshToken({ id }: JwtPayload) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
