import { Module } from '@nestjs/common';
import { AttackSimulatorController } from './attack-simulator.controller';
import { AttackSimulatorService } from './attack-simulator.service';

@Module({
  controllers: [AttackSimulatorController],
  providers: [AttackSimulatorService],
  exports: [AttackSimulatorService],
})
export class AttackSimulatorModule {}
