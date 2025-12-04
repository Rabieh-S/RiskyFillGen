import { Module } from '@nestjs/common';
import { LiveAttackService } from './live-attack.service';
import { LiveAttackGateway } from './live-attack.gateway';
import { VulnerabilityScannerService } from './vulnerability-scanner.service';

@Module({
  providers: [LiveAttackService, LiveAttackGateway, VulnerabilityScannerService],
  exports: [LiveAttackService, VulnerabilityScannerService],
})
export class LiveAttackModule {}
