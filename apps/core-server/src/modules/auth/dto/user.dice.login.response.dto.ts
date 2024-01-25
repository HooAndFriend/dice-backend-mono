import User from '../../user/domain/user.entity';

export class LoginResponseDto {
  accessToken!: string;
  nickname!: string;
  profile!: string;
  email!: string;
}

export function mapLoginResponse(
  entity: User,
  accessToken: string,
): LoginResponseDto {
  return {
    accessToken: accessToken,
    nickname: entity.nickname,
    profile: entity.profile,
    email: entity.profile,
  };
}
