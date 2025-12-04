export type AttackType = 'ransomware' | 'phishing' | 'brute_force_vpn';

export interface AttackStep {
  stepNumber: number;
  title: string;
  description: string;
  technicalDetails: string;
}

export interface Detection {
  tool: string;
  method: string;
  confidence: 'low' | 'medium' | 'high';
  description: string;
}

export interface PreventionMeasure {
  category: string;
  measure: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  implementation: string;
}

export interface AttackSimulationResult {
  attackType: AttackType;
  attackName: string;
  description: string;
  steps: AttackStep[];
  dattakDetections: Detection[];
  preventionMeasures: PreventionMeasure[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  estimatedImpact: string;
}

export interface AttackTypeOption {
  value: string;
  label: string;
  description: string;
}

// Live Attack Types
export type LiveAttackType = 'phishing' | 'ransomware' | 'brute_force_vpn';

export type LogLevel = 'info' | 'success' | 'warning' | 'error' | 'critical';

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
