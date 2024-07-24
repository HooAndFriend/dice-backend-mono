// ** Nest Imports
import { Test } from '@nestjs/testing';

// ** Module Imports
import CsCategoryService from './cs-category.service';
import CsCategoryRepository from '../repository/cs-category.repository';

// ** Entity Imports
import { NotFoundException } from '@/src/global/exception/CustomException';
import CsCategory from '../domain/cs-category.entity';

describe('CsCategory Service Test', () => {
  let service;
  let repository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CsCategoryService, CsCategoryRepository],
    }).compile();

    service = module.get(CsCategoryService);
    repository = module.get(CsCategoryRepository);
  });

  describe('Find CsCategory By Id Test', () => {
    it('CS Category가 없습니다.', () => {
      // ** Given
      jest.spyOn(repository, 'findOne').mockReturnValue(null);

      // ** When
      const response = service.findCsCategoryById();

      // ** Then
      expect(response).rejects.toThrowError(
        new NotFoundException('Not Found CsCategory'),
      );
    });

    it('CS Category가 있을 경우 CS Category를 반환합니다.', () => {
      // ** Given
      const csCategory = getCsCategory();
      jest.spyOn(repository, 'findOne').mockReturnValue(csCategory);

      // ** When
      const response = service.findCsCategoryById();

      // ** Then
      expect(response);
    });
  });
});

/**
 * Get CsCategory Dummy
 * @returns
 */
export const getCsCategory = () => {
  const csCategory = new CsCategory();
  csCategory.name = 'test';
  csCategory.createdId = 'test';
  csCategory.modifiedId = 'test';
  csCategory.createdDate = new Date();
  csCategory.modifiedDate = new Date();

  return csCategory;
};
