export enum LiveAttackType {
  PHISHING = 'phishing',
  RANSOMWARE = 'ransomware',
  BRUTE_FORCE_VPN = 'brute_force_vpn',
}

export enum LogLevel {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export interface AttackLog {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: string;
  progress: number;
}

export interface NmapScanResult {
  host: string;
  ports: {
    port: number;
    state: string;
    service: string;
    version?: string;
  }[];
  os?: string;
  scanTime: number;
}

export interface LiveAttackConfig {
  attackType: LiveAttackType;
  target?: string;
  duration?: number;
  speed?: 'slow' | 'normal' | 'fast';
}

export interface AttackProgress {
  currentStep: number;
  totalSteps: number;
  percentage: number;
  status: 'running' | 'completed' | 'failed';
}