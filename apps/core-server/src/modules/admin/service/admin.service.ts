// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Utils Imports
import * as bcrypt from 'bcryptjs';

// ** enum, dto, entity, types Imports
import AdminRepository from '../repository/admin.repository';
import RequestAdminSaveDto from '../dto/admin.save.dto';
import RequestAdminFindDto from '../dto/admin.find.dto';
import RequestAdminUpdateDto from '../dto/admin.update.dto';
import RequestAdminPasswordUpdateDto from '../dto/admin.update-password.dto';
import RequestAdminProfileUpdateDto from '../dto/admin.update-profile.dto';
import Admin from '../domain/admin.entity';
import {
  BadRequestException,
  NotFoundException,
} from '@/src/global/exception/CustomException';

@Injectable()
export default class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 관리자 생성
   */
  public async saveAdmin(
    dto: RequestAdminSaveDto,
    adminEmail: string,
  ): Promise<void> {
    const hash = await bcrypt.hash(dto.password, 10);

    await this.adminRepository.save(
      this.adminRepository.create({
        ...dto,
        profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
        password: hash,
        createdId: adminEmail,
      }),
    );
  }

  /**
   * Email로 관리자 조회
   */
  public async findOneByEmail(email: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (!admin) {
      throw new NotFoundException('존재하지 않는 관리자입니다.');
    }

    return admin;
  }

  /**
   * 비밀번호를 검증합니다.
   */
  public async validationPassword(
    admin: Admin,
    password: string,
  ): Promise<void> {
    const result = await bcrypt.compare(password, admin.password);

    if (!result) {
      throw new BadRequestException('Wrong Password');
    }
  }

  /**
   * 관리자 조회
   */
  public async findAdmin(adminId: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { adminId } });

    if (!admin) {
      throw new NotFoundException('존재하지 않는 관리자입니다.');
    }

    return admin;
  }

  /**
   * 관리자 삭제
   */
  public async deleteAdmin(adminId: number): Promise<void> {
    await this.adminRepository.delete(adminId);
  }

  /**
   * 관리자 수정
   */
  public async updateAdmin(dto: RequestAdminUpdateDto): Promise<void> {
    await this.adminRepository.update(dto.adminId, {
      nickname: dto.nickname,
      profile: dto.profile,
      role: dto.role,
    });
  }

  /**
   * 관리자 리스트 조회
   */
  public async findAdminList(
    dto: RequestAdminFindDto,
  ): Promise<[Admin[], number]> {
    return await this.adminRepository.findAdminList(dto);
  }

  /**
   * 비밀번호 수정
   */
  public async updatePassword(
    adminId: number,
    dto: RequestAdminPasswordUpdateDto,
  ): Promise<void> {
    const hash = await bcrypt.hash(dto.password, 10);

    await this.adminRepository.update(adminId, {
      password: hash,
    });
  }

  /**
   * 프로필 이미지 수정
   */
  public async updateProfile(
    adminId: number,
    dto: RequestAdminProfileUpdateDto,
  ): Promise<void> {
    await this.adminRepository.update(adminId, {
      profile: dto.profile,
    });
  }

  /**
   * 관리자가 존재하는지 확인
   */
  public async isExistAdmin(email: string): Promise<void> {
    const isExist = await this.adminRepository.exist({ where: { email } });

    if (isExist) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }
  }
}
