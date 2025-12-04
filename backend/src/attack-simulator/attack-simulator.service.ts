import { Injectable } from '@nestjs/common';
import {
  AttackType,
  AttackSimulationResult,
  AttackStep,
  Detection,
  PreventionMeasure,
} from './types';

@Injectable()
export class AttackSimulatorService {
  simulateAttack(attackType: AttackType): AttackSimulationResult {
    switch (attackType) {
      case AttackType.RANSOMWARE:
        return this.simulateRansomware();
      case AttackType.PHISHING:
        return this.simulatePhishing();
      case AttackType.BRUTE_FORCE_VPN:
        return this.simulateBruteForceVPN();
      default:
        throw new Error('Type d\'attaque non reconnu');
    }
  }

  private simulateRansomware(): AttackSimulationResult {
    const steps: AttackStep[] = [
      {
        stepNumber: 1,
        title: 'Reconnaissance initiale',
        description: 'L\'attaquant identifie les cibles et collecte des informations',
        technicalDetails: 'Scan de ports, énumération des services exposés, identification des vulnérabilités',
      },
      {
        stepNumber: 2,
        title: 'Accès initial via email de phishing',
        description: 'Envoi d\'un email malveillant contenant une pièce jointe ou un lien',
        technicalDetails: 'Email contenant une macro malveillante dans un document Office ou un lien vers un site compromis',
      },
      {
        stepNumber: 3,
        title: 'Exécution du payload',
        description: 'Le malware s\'exécute sur le système de la victime',
        technicalDetails: 'Téléchargement et exécution d\'un dropper, établissement d\'une connexion C2',
      },
      {
        stepNumber: 4,
        title: 'Escalade de privilèges',
        description: 'Obtention de droits administrateur sur le système',
        technicalDetails: 'Exploitation de CVE locales, vol de credentials, pass-the-hash',
      },
      {
        stepNumber: 5,
        title: 'Mouvement latéral',
        description: 'Propagation dans le réseau de l\'entreprise',
        technicalDetails: 'Utilisation de PsExec, WMI, RDP, exploitation de partages réseau',
      },
      {
        stepNumber: 6,
        title: 'Exfiltration de données',
        description: 'Vol de données sensibles avant chiffrement',
        technicalDetails: 'Compression et transfert de données via HTTPS, FTP, ou DNS tunneling',
      },
      {
        stepNumber: 7,
        title: 'Chiffrement des données',
        description: 'Chiffrement de tous les fichiers accessibles',
        technicalDetails: 'Algorithme AES-256 ou ChaCha20, destruction des Shadow Copies, désactivation des sauvegardes',
      },
      {
        stepNumber: 8,
        title: 'Demande de rançon',
        description: 'Affichage de la note de rançon et menace de publication des données',
        technicalDetails: 'Dépôt de fichiers README.txt, modification du fond d\'écran, contact via TOR',
      },
    ];

    const dattakDetections: Detection[] = [
      {
        tool: 'EDR (Endpoint Detection and Response)',
        method: 'Détection comportementale',
        confidence: 'high',
        description: 'Détection de l\'exécution de macros suspectes et de comportements anormaux de processus',
      },
      {
        tool: 'SIEM',
        method: 'Analyse de logs',
        confidence: 'high',
        description: 'Corrélation d\'événements suspects : connexions anormales, accès massifs aux fichiers',
      },
      {
        tool: 'Network IDS/IPS',
        method: 'Analyse réseau',
        confidence: 'medium',
        description: 'Détection de communications C2 et de trafic réseau anormal',
      },
      {
        tool: 'Email Security Gateway',
        method: 'Analyse de contenus',
        confidence: 'high',
        description: 'Détection des emails de phishing et des pièces jointes malveillantes',
      },
      {
        tool: 'Monitoring d\'intégrité de fichiers',
        method: 'Surveillance temps réel',
        confidence: 'high',
        description: 'Alerte sur modifications massives de fichiers et chiffrement',
      },
    ];

    const preventionMeasures: PreventionMeasure[] = [
      {
        category: 'Formation',
        measure: 'Sensibilisation anti-phishing',
        priority: 'critical',
        implementation: 'Sessions de formation trimestrielles, simulations d\'attaques phishing',
      },
      {
        category: 'Technique',
        measure: 'Désactivation des macros par défaut',
        priority: 'critical',
        implementation: 'GPO Windows pour bloquer les macros dans les fichiers provenant d\'Internet',
      },
      {
        category: 'Sauvegardes',
        measure: 'Sauvegardes offline régulières',
        priority: 'critical',
        implementation: 'Sauvegarde 3-2-1 avec au moins une copie hors ligne et isolée du réseau',
      },
      {
        category: 'Segmentation',
        measure: 'Segmentation réseau',
        priority: 'high',
        implementation: 'VLANs, pare-feu internes, principe du moindre privilège',
      },
      {
        category: 'Authentification',
        measure: 'MFA obligatoire',
        priority: 'critical',
        implementation: 'Authentification multi-facteurs pour tous les accès administratifs',
      },
      {
        category: 'Mises à jour',
        measure: 'Patch management',
        priority: 'high',
        implementation: 'Processus de mise à jour mensuel pour OS et applications',
      },
      {
        category: 'Monitoring',
        measure: 'EDR sur tous les endpoints',
        priority: 'critical',
        implementation: 'Déploiement d\'une solution EDR avec monitoring 24/7',
      },
      {
        category: 'Plan de réponse',
        measure: 'Plan de réponse aux incidents',
        priority: 'high',
        implementation: 'Procédures documentées, équipe formée, tests réguliers',
      },
    ];

    return {
      attackType: AttackType.RANSOMWARE,
      attackName: 'Attaque Ransomware',
      description: 'Un ransomware est un logiciel malveillant qui chiffre les données de l\'entreprise et demande une rançon pour leur déchiffrement. Ces attaques peuvent paralyser complètement une organisation.',
      steps,
      dattakDetections,
      preventionMeasures,
      riskLevel: 'critical',
      estimatedImpact: 'Arrêt complet de l\'activité, perte de données, coûts de récupération élevés (moyenne : 4.5M€), atteinte à la réputation, possibilité de poursuites légales (RGPD)',
    };
  }

  private simulatePhishing(): AttackSimulationResult {
    const steps: AttackStep[] = [
      {
        stepNumber: 1,
        title: 'Collecte d\'informations OSINT',
        description: 'Recherche d\'informations publiques sur l\'entreprise et ses employés',
        technicalDetails: 'LinkedIn, réseaux sociaux, sites web d\'entreprise, WHOIS, archives web',
      },
      {
        stepNumber: 2,
        title: 'Création de l\'infrastructure d\'attaque',
        description: 'Mise en place de domaines et serveurs malveillants',
        technicalDetails: 'Enregistrement de domaines similaires (typosquatting), configuration de serveurs de phishing',
      },
      {
        stepNumber: 3,
        title: 'Élaboration du prétexte',
        description: 'Création d\'un scénario crédible pour tromper la victime',
        technicalDetails: 'Usurpation d\'identité de la direction, faux problèmes de compte, urgence financière',
      },
      {
        stepNumber: 4,
        title: 'Création du contenu malveillant',
        description: 'Développement de l\'email et du site de phishing',
        technicalDetails: 'Clonage de pages de connexion légitimes, certificats SSL, design convaincant',
      },
      {
        stepNumber: 5,
        title: 'Campagne d\'envoi',
        description: 'Envoi massif ou ciblé d\'emails de phishing',
        technicalDetails: 'Spear-phishing ciblé ou campagne massive, spoofing d\'adresses email',
      },
      {
        stepNumber: 6,
        title: 'Collecte de credentials',
        description: 'Récupération des identifiants saisis par les victimes',
        technicalDetails: 'Capture de formulaires, journalisation des authentifications',
      },
      {
        stepNumber: 7,
        title: 'Validation des accès',
        description: 'Test des identifiants récupérés',
        technicalDetails: 'Tentatives de connexion discrètes, vérification des privilèges',
      },
      {
        stepNumber: 8,
        title: 'Exploitation des accès',
        description: 'Utilisation des comptes compromis pour des actions malveillantes',
        technicalDetails: 'Fraude au président, accès aux systèmes internes, vol de données, propagation malware',
      },
    ];

    const dattakDetections: Detection[] = [
      {
        tool: 'Email Security Gateway',
        method: 'Analyse de contenus et réputation',
        confidence: 'high',
        description: 'Détection d\'emails suspects : liens malveillants, expéditeurs usurpés, contenus frauduleux',
      },
      {
        tool: 'Anti-phishing',
        method: 'Analyse de URLs',
        confidence: 'high',
        description: 'Vérification des liens contre des bases de phishing connues et analyse heuristique',
      },
      {
        tool: 'SIEM',
        method: 'Analyse comportementale',
        confidence: 'medium',
        description: 'Détection de connexions depuis des localisations inhabituelles ou à des heures anormales',
      },
      {
        tool: 'Proxy web',
        method: 'Filtrage URL',
        confidence: 'high',
        description: 'Blocage d\'accès aux sites de phishing connus et aux domaines suspects',
      },
      {
        tool: 'Authentification',
        method: 'Analyse des patterns de connexion',
        confidence: 'medium',
        description: 'Détection de tentatives de connexion multiples avec des credentials volés',
      },
    ];

    const preventionMeasures: PreventionMeasure[] = [
      {
        category: 'Formation',
        measure: 'Formation continue anti-phishing',
        priority: 'critical',
        implementation: 'Modules e-learning mensuels, simulations d\'attaques, sensibilisation aux signaux d\'alerte',
      },
      {
        category: 'Email',
        measure: 'SPF, DKIM et DMARC',
        priority: 'critical',
        implementation: 'Configuration stricte des enregistrements DNS pour authentifier les emails légitimes',
      },
      {
        category: 'Authentification',
        measure: 'MFA sur tous les comptes',
        priority: 'critical',
        implementation: 'Authentification multi-facteurs obligatoire, impossible de se connecter sans second facteur',
      },
      {
        category: 'Filtrage',
        measure: 'Filtrage email avancé',
        priority: 'high',
        implementation: 'Solution anti-spam et anti-phishing avec sandboxing des pièces jointes',
      },
      {
        category: 'Navigateur',
        measure: 'Protection anti-phishing navigateur',
        priority: 'high',
        implementation: 'Activation des protections natives Chrome/Edge/Firefox, extensions anti-phishing',
      },
      {
        category: 'Processus',
        measure: 'Procédures de vérification',
        priority: 'high',
        implementation: 'Validation systématique des demandes sensibles par un autre canal',
      },
      {
        category: 'Surveillance',
        measure: 'Monitoring des domaines similaires',
        priority: 'medium',
        implementation: 'Surveillance des enregistrements de domaines typosquatting',
      },
      {
        category: 'Reporting',
        measure: 'Canal de signalement facile',
        priority: 'medium',
        implementation: 'Bouton de signalement d\'emails suspects dans le client mail',
      },
    ];

    return {
      attackType: AttackType.PHISHING,
      attackName: 'Attaque par Phishing',
      description: 'Le phishing est une technique d\'ingénierie sociale visant à tromper les utilisateurs pour qu\'ils divulguent des informations sensibles ou installent des malwares. C\'est le vecteur d\'attaque initial le plus courant.',
      steps,
      dattakDetections,
      preventionMeasures,
      riskLevel: 'high',
      estimatedImpact: 'Vol de credentials, compromission de comptes, accès non autorisés aux systèmes, fraude financière (moyenne : 150K€ par incident), porte d\'entrée pour d\'autres attaques',
    };
  }

  private simulateBruteForceVPN(): AttackSimulationResult {
    const steps: AttackStep[] = [
      {
        stepNumber: 1,
        title: 'Reconnaissance et identification',
        description: 'Découverte des points d\'accès VPN de l\'entreprise',
        technicalDetails: 'Scan de ports 443, 1194, 500, 4500, énumération des bannières VPN (Cisco, Fortinet, etc.)',
      },
      {
        stepNumber: 2,
        title: 'Énumération des utilisateurs',
        description: 'Identification des comptes utilisateurs valides',
        technicalDetails: 'Harvest d\'emails via OSINT, LinkedIn, fuites de données, énumération via timing attacks',
      },
      {
        stepNumber: 3,
        title: 'Préparation des dictionnaires',
        description: 'Création de listes de mots de passe probables',
        technicalDetails: 'Utilisation de bases de mots de passe compromis (rockyou, haveibeenpwned), password spraying',
      },
      {
        stepNumber: 4,
        title: 'Configuration des outils d\'attaque',
        description: 'Mise en place de l\'infrastructure de brute force',
        technicalDetails: 'Configuration d\'Hydra, Medusa ou scripts personnalisés, proxies pour éviter la détection',
      },
      {
        stepNumber: 5,
        title: 'Attaque par pulvérisation de mots de passe',
        description: 'Tests de mots de passe communs sur de nombreux comptes',
        technicalDetails: 'Tentatives lentes et distribuées pour éviter les blocages (1-3 tentatives/compte/heure)',
      },
      {
        stepNumber: 6,
        title: 'Brute force ciblé',
        description: 'Attaque intensive sur les comptes identifiés comme vulnérables',
        technicalDetails: 'Augmentation du rythme sur les comptes sans verrouillage détecté',
      },
      {
        stepNumber: 7,
        title: 'Validation des accès obtenus',
        description: 'Test des credentials identifiés avec succès',
        technicalDetails: 'Connexion VPN réussie, vérification des privilèges et accès réseau',
      },
      {
        stepNumber: 8,
        title: 'Établissement de persistance',
        description: 'Maintien de l\'accès et exploration du réseau',
        technicalDetails: 'Création de comptes backdoor, installation de RAT, reconnaissance interne',
      },
    ];

    const dattakDetections: Detection[] = [
      {
        tool: 'VPN Logs Analysis',
        method: 'Analyse des tentatives de connexion',
        confidence: 'high',
        description: 'Détection de multiples échecs de connexion depuis les mêmes IPs ou sur les mêmes comptes',
      },
      {
        tool: 'SIEM',
        method: 'Corrélation d\'événements',
        confidence: 'high',
        description: 'Identification de patterns d\'attaque par force brute : volume, timing, sources',
      },
      {
        tool: 'IDS/IPS',
        method: 'Détection réseau',
        confidence: 'medium',
        description: 'Détection de trafic anormal vers les endpoints VPN',
      },
      {
        tool: 'Threat Intelligence',
        method: 'Réputation IP',
        confidence: 'medium',
        description: 'Identification d\'IPs sources malveillantes connues ou provenant de VPN/Tor',
      },
      {
        tool: 'Behavioral Analytics',
        method: 'Analyse comportementale',
        confidence: 'high',
        description: 'Détection de connexions depuis des localisations géographiques inhabituelles',
      },
    ];

    const preventionMeasures: PreventionMeasure[] = [
      {
        category: 'Authentification',
        measure: 'MFA obligatoire sur VPN',
        priority: 'critical',
        implementation: 'Authentification multi-facteurs avec TOTP, push notification ou clé matérielle (FIDO2)',
      },
      {
        category: 'Politique de mots de passe',
        measure: 'Mots de passe forts et complexes',
        priority: 'critical',
        implementation: 'Minimum 14 caractères, complexité, renouvellement, vérification contre bases de mots de passe compromis',
      },
      {
        category: 'Limitation',
        measure: 'Rate limiting et verrouillage de compte',
        priority: 'high',
        implementation: 'Max 5 tentatives échouées puis verrouillage temporaire progressif',
      },
      {
        category: 'Filtrage',
        measure: 'Géo-blocking et listes blanches',
        priority: 'high',
        implementation: 'Restriction d\'accès par pays, whitelist d\'IPs pour accès critiques',
      },
      {
        category: 'Monitoring',
        measure: 'Surveillance temps réel des connexions',
        priority: 'high',
        implementation: 'Alertes automatiques sur tentatives suspectes, dashboard de monitoring',
      },
      {
        category: 'Architecture',
        measure: 'Segmentation réseau post-VPN',
        priority: 'high',
        implementation: 'Accès limité par profil utilisateur, pas d\'accès direct à tout le réseau',
      },
      {
        category: 'Certificats',
        measure: 'Authentification par certificat client',
        priority: 'medium',
        implementation: 'Certificats X.509 en plus de login/password',
      },
      {
        category: 'Intelligence',
        measure: 'Blocage automatique des IPs malveillantes',
        priority: 'medium',
        implementation: 'Intégration de feeds threat intelligence, blocage automatique',
      },
    ];

    return {
      attackType: AttackType.BRUTE_FORCE_VPN,
      attackName: 'Attaque par Brute Force VPN',
      description: 'Une attaque par force brute sur VPN consiste à tester systématiquement des combinaisons de credentials pour obtenir un accès au réseau de l\'entreprise. Les VPNs sont des cibles privilégiées car ils offrent un accès direct au réseau interne.',
      steps,
      dattakDetections,
      preventionMeasures,
      riskLevel: 'high',
      estimatedImpact: 'Accès non autorisé au réseau interne, vol de données sensibles, mouvement latéral, installation de malwares, compromission totale du SI',
    };
  }

  getAllAttackTypes(): { value: string; label: string; description: string }[] {
    return [
      {
        value: AttackType.RANSOMWARE,
        label: 'Ransomware',
        description: 'Chiffrement des données avec demande de rançon',
      },
      {
        value: AttackType.PHISHING,
        label: 'Phishing',
        description: 'Tentative de vol d\'identifiants par ingénierie sociale',
      },
      {
        value: AttackType.BRUTE_FORCE_VPN,
        label: 'Brute Force VPN',
        description: 'Tentatives multiples de connexion VPN pour deviner les credentials',
      },
    ];
  }
}
