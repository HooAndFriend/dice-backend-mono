// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import ViewController from './controller/view.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [ViewController],
})
export default class ViewModule {}
