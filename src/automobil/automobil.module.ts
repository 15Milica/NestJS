import { Module } from '@nestjs/common';
import { AutomobilController } from './automobil.controller';
import { AutomobilService } from './automobil.service';

@Module({
     imports: [],
     controllers: [AutomobilController],
     providers: [AutomobilService],
})
export class AutomobilModule {}
