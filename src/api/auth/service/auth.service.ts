// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import UserRepository from '../../user/repository/user.repository';

// ** Utils Imports
import * as bcrypt from 'bcryptjs';

// ** enum, dto, entity, types Imports
import {
  BadRequestException,
  NotFoundException,
} from 'src/exception/customException';
import { JwtPayload } from 'src/types';
import CommonResponse from 'src/common/dto/api.response';
import RequestSocialUserLoginDto from '../dto/user.social.login.dto';
import RequestSocialUserSaveDto from '../dto/user.social.save.dto';
import RequestDiceUserLoginDto from '../dto/user.dice.login.dto';
import RequestDiceUserSaveDto from '../dto/user.dice.save.dto';
import { UserType } from 'src/common/enum/UserType.enum';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async saveSocialUser(dto: RequestSocialUserSaveDto) {
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

  public async loginSocialUser(dto: RequestSocialUserLoginDto) {
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

  public async loginDiceUser(dto: RequestDiceUserLoginDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (!findUser) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    const result = await bcrypt.compare(dto.password, findUser.password);

    if (!result) {
      throw new BadRequestException('비밀번호가 맞지 않습니다.');
    }

    const token = this.generateToken({ id: findUser.id });

    return CommonResponse.of({
      statusCode: 200,
      message: '로그인에 성공했습니다.',
      data: token,
    });
  }

  public async saveDiceUser(dto: RequestDiceUserSaveDto) {
    const findUser = await this.userRepository.findOne({
      where: { token: dto.username },
    });

    if (findUser) {
      return new BadRequestException('이미 회원가입한 유저 입니다.');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const saveUser = await this.userRepository.save(
      this.userRepository.create({
        username: dto.username,
        password: hash,
        nickname: dto.nickname,
        type: UserType.DICE,
      }),
    );

    const token = this.generateToken({ id: saveUser.id });

    return CommonResponse.of({
      statusCode: 200,
      message: '회원가입 했습니다.',
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
