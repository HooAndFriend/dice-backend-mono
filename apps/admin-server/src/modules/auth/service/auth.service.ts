// ** Nest Imports
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import AdminRepository from '../../admin/repository/admin.repository';
// ** Utils Imports
import * as bcrypt from 'bcryptjs';

// ** enum, dto, entity, types Imports
import RequestAdminLoginDto from '../dto/admin.login.dto';
import {
  BadRequestException,
  NotFoundException,
} from '@/src/global/exception/CustomException';
import { JwtPayload } from '@/src/global/types';
import AdminRoleEnum from '../../admin/domain/admin-role.enum';

@Injectable()
export default class AuthService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private logger = new Logger();

  /**
   * Admin Login
   * @param dto
   * @returns
   */
  public async adminLogin(dto: RequestAdminLoginDto) {
    const findAdmin = await this.adminRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!findAdmin) {
      throw new NotFoundException('관리자를 찾을 수 없습니다.');
    }

    const result = await bcrypt.compare(dto.password, findAdmin.password);

    if (!result) {
      throw new BadRequestException('비밀번호가 맞지 않습니다.');
    }

    return findAdmin;
  }

  /**
   * Generate Token
   * @param payload
   * @returns
   */
  public generateToken(payload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
  } {
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

  /**
   * Find Admin
   * @param param0
   * @returns
   */
  public async findUserByJwt({ id }: JwtPayload): Promise<any> {
    const findUser = await this.adminRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new UnauthorizedException('Not Found User');
    }
    return findUser;
  }

  /**
   * Find Admin
   * @param param0
   * @returns
   */
  public async findRefreshToken({ id }: JwtPayload) {
    return await this.adminRepository.findOne({ where: { id } });
  }
}
