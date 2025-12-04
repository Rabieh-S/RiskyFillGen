import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AttackSimulatorService } from './attack-simulator.service';
import { AttackType } from './types';
import type { SimulationRequest } from './types';

@Controller('api/attack-simulator')
export class AttackSimulatorController {
  constructor(private readonly attackSimulatorService: AttackSimulatorService) {}

  @Get('attack-types')
  getAttackTypes() {
    return {
      success: true,
      data: this.attackSimulatorService.getAllAttackTypes(),
    };
  }

  @Post('simulate')
  simulateAttack(@Body() request: SimulationRequest) {
    try {
      if (!request.attackType) {
        throw new HttpException(
          'Le type d\'attaque est requis',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!Object.values(AttackType).includes(request.attackType)) {
        throw new HttpException(
          'Type d\'attaque invalide',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = this.attackSimulatorService.simulateAttack(request.attackType);

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erreur lors de la simulation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
