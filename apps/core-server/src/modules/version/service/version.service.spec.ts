// ** Nest Imports
import { Test } from '@nestjs/testing';

// ** Module Imports
import VersionService from './version.service';
import VersionRepository from '../repository/version.repository';

// ** Dto Imports
import VersionTypeEnum from '../domain/version-type.enum';
import { NotFoundException } from '@hi-dice/common';
import Version from '../domain/version.entity';

describe('Version Service', () => {
  let service;
  let repository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [VersionService, VersionRepository],
    }).compile();

    service = module.get(VersionService);
    repository = module.get(VersionRepository);
  });

  describe('find Lastest Vesrion', () => {
    it('해당 Type의 버전이 없습니다.', () => {
      // ** Given
      jest.spyOn(repository, 'findOne').mockReturnValue(null);

      // ** When
      const response = service.findLastestVesrion(VersionTypeEnum.MAC);

      // ** Then
      expect(response).rejects.toThrowError(
        new NotFoundException('해당 type 버전이 없습니다.'),
      );
    });

    it('해당 Type의 Version이 있을 경우 Version을 반환합니다.', () => {
      // ** Given
      const version = getVersion();
      jest.spyOn(repository, 'findOne').mockReturnValue(version);

      // ** When
      const response = service.findLastestVesrion(VersionTypeEnum.MAC);

      // ** Then
      expect(response).resolves.toEqual(version);
    });
  });
});

const getVersion = () => {
  const version = new Version();

  version.versionId = 1;
  version.memo = 'test';
  version.program = 'test';
  version.type = VersionTypeEnum.MAC;
  version.version = '1.0.0';
  version.createdId = 'admin';
  version.modifiedId = 'admin';
  version.createdDate = new Date();
  version.modifiedDate = new Date();

  return version;
};
