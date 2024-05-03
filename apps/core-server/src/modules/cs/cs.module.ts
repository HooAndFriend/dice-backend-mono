// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Entity Imports
import QnaModule from './qna/qna.module';
import CsCategoryModule from './category/cs-category.module';
import FaqModule from './faq/faq.module';

@Module({
  imports: [
    forwardRef(() => QnaModule),
    forwardRef(() => CsCategoryModule),
    forwardRef(() => FaqModule),
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export default class CsModule {}
