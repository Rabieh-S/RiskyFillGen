export enum AttackType {
  RANSOMWARE = 'ransomware',
  PHISHING = 'phishing',
  BRUTE_FORCE_VPN = 'brute_force_vpn',
}

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

export interface SimulationRequest {
  attackType: AttackType;
}
