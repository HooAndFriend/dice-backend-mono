// ** Nest Imports
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import AuthService from './service/auth.service';
import UserRepository from '../user/repository/user.repository';
import WorkspaceRepository from '../workspace/repository/workspace.repository';
import WorkspaceUserRepository from '../workspace-user/repository/workspace-user.repository';
import { AppModule } from 'src/app.module';

// ** Dto Imports
import User from '../user/domain/user.entity';
import RequestDiceUserLoginDto from './dto/user.dice.login.dto';

// ** Utils Imports
import * as bcrypt from 'bcryptjs';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockUserInfo = { username: 'admin', password: '1234' };

const mockTokenInfo = {
  accessToken: 'access.token.c',
  refreshToken: 'refresh.token.c',
};

describe('AuthService unit test', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AuthService,
        UserRepository,
        JwtService,
        ConfigService,
        WorkspaceRepository,
        WorkspaceUserRepository,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    user = await generateUser(mockUserInfo);
  });

  describe('DICE LOGIN TEST', () => {
    it('로그인 성공', async () => {
      // given
      const loginRequest: RequestDiceUserLoginDto = {
        username: 'admin',
        password: '1234',
      };
      jest
        .spyOn(authService, 'generateToken')
        .mockResolvedValue(mockTokenInfo as never);

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(user);

      // when
      await authService.loginDiceUser(loginRequest);

      // then
      expect(userRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
    });
    it('로그인 실패 - 회원 정보 없음', async () => {
      // given
      const loginRequest: RequestDiceUserLoginDto = {
        username: 'admin000',
        password: '1234',
      };

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(null);

      try {
        await authService.loginDiceUser(loginRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }

      // then
      expect(userRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
    });
    it('로그인 실패 - 비밀번호 불일치', async () => {
      // given
      const loginRequest: RequestDiceUserLoginDto = {
        username: 'admin',
        password: '123456',
      };

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(user);

      try {
        await authService.loginDiceUser(loginRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      // then
      expect(userRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
    });
  });
});

const generateUser = async ({ id = 1, username, password }) => {
  const hash = await bcrypt.hash(password, 10);

  const user = new User();
  user.username = username;
  user.password = hash;
  user.id = id;

  return user;
};
