import { Injectable } from '@nestjs/common';
import {
  LiveAttackType,
  AttackLog,
  LogLevel,
  NmapScanResult,
  LiveAttackConfig,
} from './live-attack.types';
import * as nmap from 'node-nmap';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class LiveAttackService {
  // Générateur de logs pour l'attaque Phishing
  async *generatePhishingLogs(
    config: LiveAttackConfig,
  ): AsyncGenerator<AttackLog> {
    const target = config.target || 'example-corp.com';
    const speed = this.getDelayForSpeed(config.speed);

    const logs: AttackLog[] = [
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message: '[RECONNAISSANCE] Début de la collecte OSINT',
        details: `Analyse de ${target} et recherche d'employés sur LinkedIn`,
        progress: 5,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.SUCCESS,
        message: '[RECONNAISSANCE] 47 employés identifiés',
        details: 'Emails formats découverts : prenom.nom@example-corp.com',
        progress: 10,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message: '[INFRASTRUCTURE] Enregistrement du domaine malveillant',
        details: `Domaine typosquatting: examp1e-corp.com (avec chiffre 1)`,
        progress: 20,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.SUCCESS,
        message: '[INFRASTRUCTURE] Certificat SSL obtenu',
        details: "Let's Encrypt - Certificat valide pour crédibilité accrue",
        progress: 30,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message: '[INGÉNIERIE SOCIALE] Création du prétexte',
        details: 'Scénario: Notification IT urgente - Mise à jour obligatoire',
        progress: 40,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message: '[CRÉATION] Clonage de la page de login Office 365',
        details: 'Page identique créée avec capture de credentials',
        progress: 50,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.WARNING,
        message: '[CAMPAGNE] Envoi de 47 emails de phishing',
        details: "Taux d'ouverture estimé: 40-60%",
        progress: 60,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.SUCCESS,
        message: '[COLLECTE] Premier utilisateur piégé',
        details:
          'Credentials récupérés: john.doe@example-corp.com / P@ssw0rd123',
        progress: 70,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.SUCCESS,
        message: '[COLLECTE] 8 comptes compromis au total',
        details: 'Taux de réussite: 17% (excellent pour une campagne)',
        progress: 80,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.CRITICAL,
        message: '[VALIDATION] Connexions testées avec succès',
        details: '5 comptes ont accès VPN, 3 sont admins',
        progress: 90,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.CRITICAL,
        message: '[EXPLOITATION] Accès aux systèmes internes obtenu',
        details: 'Mouvement latéral possible - Objectif atteint',
        progress: 100,
      },
    ];

    for (const log of logs) {
      await this.delay(speed);
      yield log;
    }
  }

  // Générateur de logs pour l'attaque Ransomware
  async *generateRansomwareLogs(
    config: LiveAttackConfig,
  ): AsyncGenerator<AttackLog> {
    const speed = this.getDelayForSpeed(config.speed);

    const logs: AttackLog[] = [
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message: '[RECONNAISSANCE] Scan des ports ouverts',
        details: 'Identification des services exposés sur le réseau',
        progress: 5,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.SUCCESS,
        message: '[RECONNAISSANCE] Ports critiques détectés',
        details: 'Port 3389 (RDP) exposé, SMBv1 actif sur plusieurs machines',
        progress: 10,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message: '[ACCÈS INITIAL] Envoi du payload via email',
        details: 'Document Word avec macro malveillante: Facture_Q4_2024.docm',
        progress: 20,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.WARNING,
        message: '[EXÉCUTION] Macro exécutée sur workstation-042',
        details: 'Processus PowerShell lancé avec droits utilisateur',
        progress: 30,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.SUCCESS,
        message: '[C2] Connexion au serveur de commande établie',
        details: 'Beacon actif toutes les 60s vers 185.220.101.42:443',
        progress: 40,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.WARNING,
        message: '[ESCALADE] Élévation de privilèges réussie',
        details: 'Exploitation CVE-2021-36934 - Droits SYSTEM obtenus',
        progress: 50,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.CRITICAL,
        message: '[PROPAGATION] Mouvement latéral en cours',
        details: '12 machines infectées via PsExec et partages réseau',
        progress: 60,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.WARNING,
        message: '[EXFILTRATION] Extraction de données sensibles',
        details:
          '45 GB de données compressées et transférées (comptabilité, RH)',
        progress: 70,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.CRITICAL,
        message: '[CHIFFREMENT] Début du chiffrement des fichiers',
        details: 'Algorithme: AES-256 + RSA-4096 - Shadow Copies supprimées',
        progress: 80,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.CRITICAL,
        message: '[CHIFFREMENT] 2,847 fichiers chiffrés',
        details: 'Extensions: .docx, .xlsx, .pdf, .db, .sql, .bak',
        progress: 90,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.CRITICAL,
        message: '[RANÇON] Note de rançon déployée',
        details: 'Montant demandé: 500,000€ en Bitcoin - Deadline: 72h',
        progress: 100,
      },
    ];

    for (const log of logs) {
      await this.delay(speed);
      yield log;
    }
  }

  // Générateur de logs pour l'attaque Brute Force VPN
  async *generateBruteForceVpnLogs(
    config: LiveAttackConfig,
  ): AsyncGenerator<AttackLog> {
    const target = config.target || '192.168.1.1';
    const speed = this.getDelayForSpeed(config.speed);

    const logs: AttackLog[] = [
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message: "[RECONNAISSANCE] Scan du point d'accès VPN",
        details: `Cible: ${target} - Détection du type de VPN`,
        progress: 5,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.SUCCESS,
        message: '[RECONNAISSANCE] VPN identifié',
        details: 'Cisco AnyConnect SSL VPN - Version 4.9.x détectée',
        progress: 10,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message: "[ÉNUMÉRATION] Collecte des noms d'utilisateurs",
        details:
          '127 emails employés récupérés via LinkedIn et fuites de données',
        progress: 20,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message: '[PRÉPARATION] Chargement des dictionnaires',
        details: 'Liste: top-10000-passwords + variations entreprise',
        progress: 30,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message: '[ATTAQUE] Démarrage Password Spraying',
        details: 'Tentative: Password123! sur 127 comptes (rate: 1/min)',
        progress: 40,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.WARNING,
        message: '[ATTAQUE] Premier succès détecté',
        details: 'Compte: m.dubois@example-corp.com / Password123!',
        progress: 50,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message: '[ATTAQUE] Continuation Password Spraying',
        details: 'Nouveau mot de passe testé: Welcome2024!',
        progress: 60,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.SUCCESS,
        message: '[ATTAQUE] 4 comptes compromis',
        details: 'Taux de succès: 3.1% - Absence de rate limiting détectée',
        progress: 70,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.WARNING,
        message: '[BRUTE FORCE] Attaque ciblée sur compte admin',
        details: 'admin@example-corp.com - 500 tentatives/min via botnet',
        progress: 80,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.CRITICAL,
        message: '[SUCCÈS] Compte administrateur compromis',
        details: 'admin@example-corp.com / CompanyAdmin2023!',
        progress: 90,
      },
      {
        timestamp: new Date().toISOString(),
        level: LogLevel.CRITICAL,
        message: '[PERSISTANCE] Accès VPN établi et backdoor créé',
        details: "Compte secondaire créé pour maintenir l'accès",
        progress: 100,
      },
    ];

    for (const log of logs) {
      await this.delay(speed);
      yield log;
    }
  }

  async scanTarget(
    target: string,
    scanType: 'quick' | 'full' = 'quick',
  ): Promise<NmapScanResult> {
    if (!this.isValidTargetFormat(target)) {
      throw new Error(
        'Format de cible invalide. Utilisez une adresse IP ou un nom de domaine valide.',
      );
    }

    console.warn(
      `[NMAP SCAN] Target: ${target} | Type: ${scanType} | Timestamp: ${new Date().toISOString()}`,
    );
    console.warn(
      "[SECURITY] Assurez-vous d'avoir l'autorisation explicite pour scanner cette cible.",
    );

    return this.scanTargetDirect(target, scanType);
  }

  private async scanTargetDirect(
    target: string,
    scanType: 'quick' | 'full',
  ): Promise<NmapScanResult> {
    const scanOptions =
      scanType === 'quick' ? '-sV -F -T4 -Pn' : '-sV -p- -T4 -Pn';
    const command = `nmap ${scanOptions} ${target}`;

    console.log(`[NMAP DIRECT] Executing: ${command}`);

    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout: 120000,
        maxBuffer: 1024 * 1024 * 10,
      });

      if (stderr && stderr.trim() !== '') {
        console.warn(`[NMAP DIRECT] stderr:`, stderr);
      }

      console.log(`[NMAP DIRECT] stdout:`, stdout);

      const result: NmapScanResult = {
        host: target,
        ports: [],
        scanTime: Date.now(),
      };

      const portRegex = /(\d+)\/(tcp|udp)\s+open\s+(\S+)\s*(.*)?/gi;
      let match;

      while ((match = portRegex.exec(stdout)) !== null) {
        const port = {
          port: parseInt(match[1]),
          state: 'open',
          service: match[3] || 'unknown',
          version: match[4] ? match[4].trim() : undefined,
        };
        result.ports.push(port);
        console.log(`[NMAP DIRECT] Found port:`, port);
      }

      console.log(`[NMAP DIRECT] Total ports found: ${result.ports.length}`);

      return result;
    } catch (error) {
      console.error(`[NMAP DIRECT] Error:`, error);

      if (error.code === 'ENOENT') {
        throw new Error(
          "nmap n'est pas installé ou n'est pas dans le PATH. Installez-le avec: sudo apt-get install nmap",
        );
      }

      if (error.killed) {
        throw new Error('Le scan a dépassé le timeout de 2 minutes');
      }

      throw new Error(`Erreur lors du scan: ${error.message}`);
    }
  }

  private async scanTargetWithNodeNmap(
    target: string,
    scanType: 'quick' | 'full',
  ): Promise<NmapScanResult> {
    return new Promise((resolve, reject) => {
      const scanOptions =
        scanType === 'quick' ? '-sV -F -T4 -Pn' : '-sV -p- -T4 -Pn';

      console.log(`[NMAP] Starting scan with options: ${scanOptions}`);

      const quickscan = new nmap.QuickScan(target, scanOptions);

      quickscan.on('complete', (data) => {
        console.log(
          '[NMAP] Scan complete, raw data:',
          JSON.stringify(data, null, 2),
        );

        const result: NmapScanResult = {
          host: target,
          ports: [],
          scanTime: Date.now(),
        };

        if (!data || data.length === 0) {
          console.warn('[NMAP] No data returned from scan');
          resolve(result);
          return;
        }

        const hostData = data[0];
        console.log('[NMAP] Host data:', JSON.stringify(hostData, null, 2));

        if (hostData.openPorts && Array.isArray(hostData.openPorts)) {
          console.log(`[NMAP] Found ${hostData.openPorts.length} open ports`);
          result.ports = hostData.openPorts.map((port: any) => {
            const portInfo = {
              port: parseInt(port.port) || port.port,
              state: port.state || 'open',
              service: port.service || 'unknown',
              version: port.version || undefined,
            };
            console.log('[NMAP] Port info:', portInfo);
            return portInfo;
          });
        } else {
          console.warn('[NMAP] No openPorts array in hostData');

          if (hostData.ports) {
            console.log('[NMAP] Trying ports property:', hostData.ports);
            const ports = Array.isArray(hostData.ports)
              ? hostData.ports
              : [hostData.ports];
            result.ports = ports
              .filter((p: any) => p.state === 'open')
              .map((port: any) => ({
                port: parseInt(port.port) || port.port,
                state: port.state || 'open',
                service: port.service || 'unknown',
                version: port.version || undefined,
              }));
          }
        }

        if (
          hostData.os &&
          Array.isArray(hostData.os) &&
          hostData.os.length > 0
        ) {
          result.os = hostData.os[0].name || 'Unknown';
        }

        console.log('[NMAP] Final result:', JSON.stringify(result, null, 2));
        resolve(result);
      });

      quickscan.on('error', (error) => {
        console.error('[NMAP] Scan error:', error);
        reject(new Error(`Scan failed: ${error.message}`));
      });

      try {
        quickscan.startScan();
      } catch (error) {
        console.error('[NMAP] Failed to start scan:', error);
        reject(error);
      }
    });
  }

  private isValidTargetFormat(target: string): boolean {
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    const domainPattern =
      /^([a-zA-Z0-9]([a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    const localhostPattern = /^localhost$/i;

    if (localhostPattern.test(target)) {
      return true;
    }

    if (ipPattern.test(target)) {
      const octets = target.split('.').map(Number);
      return octets.every((octet) => octet >= 0 && octet <= 255);
    }

    return domainPattern.test(target);
  }

  private getDelayForSpeed(speed?: 'slow' | 'normal' | 'fast'): number {
    switch (speed) {
      case 'slow':
        return 3000;
      case 'fast':
        return 500;
      case 'normal':
      default:
        return 1500;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
