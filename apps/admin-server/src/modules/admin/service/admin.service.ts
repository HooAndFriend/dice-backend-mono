// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Utils Imports
import * as bcrypt from 'bcryptjs';

// ** enum, dto, entity, types Imports
import AdminRepository from '../repository/admin.repository';
import RequestAdminSaveDto from '../dto/admin.save.dto';
import { BadRequestException } from '@/src/global/exception/CustomException';
import RequestAdminFindDto from '../dto/admin.find.dto';

@Injectable()
export default class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Save Admin
   * @param dto
   * @param adminEmail
   */
  public async saveAdmin(dto: RequestAdminSaveDto, adminEmail: string) {
    const hash = await bcrypt.hash(dto.password, 10);

    await this.adminRepository.save(
      this.adminRepository.create({
        ...dto,
        password: hash,
        createdId: adminEmail,
      }),
    );
  }

  /**
   * Find Admin List
   * @param dto
   * @returns
   */
  public async findAdminList(dto: RequestAdminFindDto) {
    return await this.adminRepository.findAdminList(dto);
  }

  /**
   * Exist Admin
   * @param email
   */
  public async isExistAdmin(email: string) {
    const isExist = await this.adminRepository.exist({ where: { email } });

    if (isExist) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }
  }
}
