// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Custom Module Imports
import CsCategoryModule from './category/cs-category.module';
import FaqModule from './faq/faq.module';
import QnaModule from './qna/qna.module';

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
