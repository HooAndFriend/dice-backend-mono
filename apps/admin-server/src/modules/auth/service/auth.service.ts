// ** Nest Imports
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

// ** Custom Module Imports
import AdminRepository from '../../admin/repository/admin.repository';
// ** Utils Imports
import * as bcrypt from 'bcryptjs';

// ** enum, dto, entity, types Imports
import RequestAdminLoginDto from '../dto/admin.login.dto';
import { BadRequestException, NotFoundException } from '@repo/common';
import { JwtPayload } from '@/src/global/types';
import RequestAdminFindPasswordDto from '../dto/admin.find-password.dto';
import { SendMailDto } from '@repo/common';
import RequestAdminUpdatePasswordDto from '../dto/admin.update-password';

@Injectable()
export default class AuthService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('RMQ_PUSH_QUE') private readonly rmqClient: ClientProxy,
  ) {}

  private logger = new Logger(AuthService.name);

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
   * Find Password
   * @param dto
   */
  public async resetPasswordSendEmail(dto: RequestAdminFindPasswordDto) {
    const admin = await this.findAdmin(dto.email);

    await this.sendMail(
      new SendMailDto(
        dto.email,
        '[DICE] Update Password',
        'Update Admin Password',
        `<a href="http://admin.hi-dice.com/password?id=${admin.id}">Click</a>`,
      ),
    );
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
      throw new UnauthorizedException('관리자를 찾을 수 없습니다.');
    }
    return findUser;
  }

  /**
   * Update Password
   * @param dto
   */
  public async updatePassword(dto: RequestAdminUpdatePasswordDto) {
    await this.adminRepository.update(
      { id: dto.id },
      { password: dto.password },
    );
  }

  /**
   * Existed Admin
   * @param id
   */
  public async existedAdminById(id: number) {
    const admin = await this.adminRepository.exist({ where: { id } });

    if (!admin) {
      throw new NotFoundException('관리자를 찾을 수 없습니다.');
    }
  }

  /**
   * Find Admin
   * @param param0
   * @returns
   */
  public async findRefreshToken({ id }: JwtPayload) {
    return await this.adminRepository.findOne({ where: { id } });
  }

  /**
   * Find Admin
   * @param email
   * @returns Admin
   */
  private async findAdmin(email: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (!admin) {
      throw new NotFoundException('관리자를 찾을 수 없습니다.');
    }

    return admin;
  }

  /**
   * Find Admin
   * @param id
   * @returns Admin
   */
  private async findAdminById(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException('관리자를 찾을 수 없습니다.');
    }

    return admin;
  }

  /**
   * Send Mail
   * @param dto
   */
  private async sendMail(dto: SendMailDto) {
    this.rmqClient
      .send<SendMailDto>('send-single-mail', dto)
      .toPromise()
      .catch((err) => {
        this.logger.log(err);
      });
  }
}
