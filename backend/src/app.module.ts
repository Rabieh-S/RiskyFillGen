import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttackSimulatorModule } from './attack-simulator/attack-simulator.module';
import { LiveAttackModule } from './live-attack/live-attack.module';

@Module({
  imports: [AttackSimulatorModule, LiveAttackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
