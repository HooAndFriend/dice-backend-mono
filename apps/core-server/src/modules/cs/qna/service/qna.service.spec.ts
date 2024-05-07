// ** Nest Imports
import { Test } from '@nestjs/testing';

// ** Module Imports
import QnaService from './qna.service';
import QnaRepository from '../repository/qna.repository';

// ** Entity Imports
import Qna from '../domain/qna.entity';

describe('Qna Service Test', () => {
  let service;
  let repository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [QnaService, QnaRepository],
    }).compile();

    service = module.get(QnaService);
    repository = module.get(QnaRepository);
  });

  describe('Save Qna', () => {
    it('QNA를 저장합니다.', () => {
      // ** Given
      const qna = getQna();
      jest.spyOn(repository, 'save').mockReturnValue(qna);
      jest.spyOn(repository, 'create').mockReturnValue(qna);

      // ** When
      const response = service.saveQna();

      // ** Then
      expect(response);
    });
  });
});

export const getQna = () => {
  const qna = new Qna();
  qna.name = 'test';
  qna.email = 'test';
  qna.title = 'test';
  qna.text = 'test';
  qna.isAnswer = false;
};
