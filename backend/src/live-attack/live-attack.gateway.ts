import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LiveAttackService } from './live-attack.service';
import { VulnerabilityScannerService } from './vulnerability-scanner.service';
import { LiveAttackType } from './live-attack.types';
import type { LiveAttackConfig, AttackLog } from './live-attack.types';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class LiveAttackGateway {
  @WebSocketServer()
  server: Server;

  // Map pour tracker les simulations actives
  private activeSimulations: Map<string, boolean> = new Map();

  constructor(
    private readonly liveAttackService: LiveAttackService,
    private readonly vulnerabilityScannerService: VulnerabilityScannerService,
  ) {}

  @SubscribeMessage('startLiveAttack')
  async handleStartLiveAttack(
    @MessageBody() config: LiveAttackConfig,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(
      `Starting live attack: ${config.attackType} for client ${client.id}`,
    );

    // Marquer cette simulation comme active
    this.activeSimulations.set(client.id, true);

    try {
      let logGenerator: AsyncGenerator<AttackLog>;

      // Sélectionner le bon générateur en fonction du type d'attaque
      switch (config.attackType) {
        case LiveAttackType.PHISHING:
          logGenerator = this.liveAttackService.generatePhishingLogs(config);
          break;
        case LiveAttackType.RANSOMWARE:
          logGenerator = this.liveAttackService.generateRansomwareLogs(config);
          break;
        case LiveAttackType.BRUTE_FORCE_VPN:
          logGenerator =
            this.liveAttackService.generateBruteForceVpnLogs(config);
          break;
        default:
          throw new Error("Type d'attaque non reconnu");
      }

      // Envoyer les logs en temps réel avec vérification d'arrêt
      for await (const log of logGenerator) {
        // Vérifier si la simulation a été arrêtée
        if (!this.activeSimulations.get(client.id)) {
          console.log(`Simulation stopped for client ${client.id}`);
          break;
        }
        client.emit('attackLog', log);
      }

      // Nettoyer et signaler la fin
      this.activeSimulations.delete(client.id);

      // Signaler la fin seulement si pas arrêté manuellement
      if (
        this.activeSimulations.has(client.id) ||
        !this.activeSimulations.get(client.id)
      ) {
        client.emit('attackComplete', {
          message: 'Simulation terminée',
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      this.activeSimulations.delete(client.id);
      client.emit('attackError', {
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  @SubscribeMessage('startNmapScan')
  async handleNmapScan(
    @MessageBody() data: { target: string; scanType?: 'quick' | 'full' },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Starting nmap scan on ${data.target} for client ${client.id}`);

    try {
      // Envoyer un message de début
      client.emit('scanStarted', {
        target: data.target,
        message: 'Scan nmap démarré...',
        timestamp: new Date().toISOString(),
      });

      // Effectuer le scan
      const result = await this.liveAttackService.scanTarget(
        data.target,
        data.scanType || 'quick',
      );

      // Envoyer le résultat
      client.emit('scanComplete', {
        result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      client.emit('scanError', {
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  @SubscribeMessage('scanVulnerabilities')
  async handleVulnerabilityScan(
    @MessageBody() data: { target: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(
      `Starting vulnerability scan on ${data.target} for client ${client.id}`,
    );

    try {
      client.emit('vulnScanStarted', {
        target: data.target,
        message: 'Scan de vulnérabilités démarré...',
        timestamp: new Date().toISOString(),
      });

      const report = await this.vulnerabilityScannerService.scanTarget(
        data.target,
      );

      client.emit('vulnScanComplete', {
        report,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error(`[VULN SCAN] Error:`, error);
      client.emit('vulnScanError', {
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  @SubscribeMessage('stopAttack')
  handleStopAttack(@ConnectedSocket() client: Socket) {
    console.log(`Stopping attack for client ${client.id}`);

    // Marquer la simulation comme arrêtée
    this.activeSimulations.set(client.id, false);

    client.emit('attackStopped', {
      message: 'Simulation arrêtée',
      timestamp: new Date().toISOString(),
    });
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('connected', {
      message: 'Connecté au serveur de simulation',
      clientId: client.id,
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Nettoyer les simulations actives
    this.activeSimulations.delete(client.id);
  }
}
