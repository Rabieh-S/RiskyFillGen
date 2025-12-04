# DattaK - Simulateur d'Attaques Cyber

Simulateur d'attaques en chaîne pour l'entreprise DattaK, une assurance cyber pour les entreprises.

## Description

Ce projet est un outil éducatif qui simule différents types d'attaques cyber et montre :
- Les étapes détaillées de chaque attaque
- Ce que DattaK peut détecter
- Les mesures de prévention recommandées

## Modes de Simulation

### 📊 Mode Rapport (Classique)
Analyse détaillée post-attaque avec :
- Étapes de l'attaque
- Capacités de détection DattaK
- Mesures de prévention recommandées

### 🎯 Mode Live Attack (NOUVEAU !)
Simulation en temps réel avec :
- **Logs défilants** : Visualisation en direct des étapes d'attaque
- **Scanner Nmap** : Scan sécurisé des ports (localhost uniquement)
- **Terminal animé** : Interface dramatique style hacker
- **Progression en temps réel** : Barre de progression et indicateurs
- **WebSocket** : Communication temps réel client-serveur

[📖 Documentation complète du Mode Live Attack](./LIVE_ATTACK_MODE.md)

## Types d'attaques simulées

1. **Ransomware** : Chiffrement des données avec demande de rançon
2. **Phishing** : Tentative de vol d'identifiants par ingénierie sociale
3. **Brute Force VPN** : Tentatives multiples de connexion VPN pour deviner les credentials

## Architecture

- **Backend** : NestJS (TypeScript)
- **Frontend** : React + TypeScript (Vite)
- **API REST** : Communication entre frontend et backend

## Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn

### Installation du Backend

```bash
cd backend
npm install
```

### Installation du Frontend

```bash
cd frontend
npm install
```

## Lancement

### Démarrer le Backend

```bash
cd backend
npm run start:dev
```

Le backend sera accessible sur `http://localhost:3000`

### Démarrer le Frontend

Dans un nouveau terminal :

```bash
cd frontend
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

## Utilisation

1. Ouvrez votre navigateur sur `http://localhost:5173`
2. Sélectionnez un type d'attaque parmi les trois proposés
3. Cliquez sur "Lancer la simulation"
4. Explorez les résultats :
   - Étapes de l'attaque
   - Capacités de détection de DattaK
   - Mesures de prévention recommandées

## API Endpoints

### GET `/api/attack-simulator/attack-types`
Récupère la liste des types d'attaques disponibles.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "value": "ransomware",
      "label": "Ransomware",
      "description": "Chiffrement des données avec demande de rançon"
    }
  ]
}
```

### POST `/api/attack-simulator/simulate`
Lance une simulation d'attaque.

**Request:**
```json
{
  "attackType": "ransomware"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "attackType": "ransomware",
    "attackName": "Attaque Ransomware",
    "description": "...",
    "steps": [...],
    "dattakDetections": [...],
    "preventionMeasures": [...],
    "riskLevel": "critical",
    "estimatedImpact": "..."
  }
}
```

## Structure du projet

```
RiskyFillGen/
├── backend/
│   ├── src/
│   │   ├── attack-simulator/
│   │   │   ├── attack-simulator.controller.ts
│   │   │   ├── attack-simulator.service.ts
│   │   │   ├── attack-simulator.module.ts
│   │   │   └── types.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── types.ts
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## Développement

### Backend

Le backend utilise NestJS avec une architecture modulaire :
- **Controller** : Gère les endpoints HTTP
- **Service** : Contient la logique métier et les données des simulations
- **Types** : Définit les interfaces TypeScript

### Frontend

Le frontend utilise React avec :
- **Hooks** : useState, useEffect pour la gestion d'état
- **Fetch API** : Communication avec le backend
- **CSS moderne** : Gradients, animations, responsive design

## ⚠️ Sécurité et Utilisation Responsable

**IMPORTANT** : Ce projet inclut des outils de scan réseau (Nmap).

📖 **Veuillez lire [SECURITY_USAGE.md](./SECURITY_USAGE.md) avant toute utilisation.**

- ⚖️ Scanner sans autorisation est **ILLÉGAL**
- ✅ Utilisez uniquement sur des systèmes autorisés
- 📝 Obtenez des autorisations écrites pour tout pentest
- 🎓 Usage éducatif, CTF et environnements personnels uniquement

**Vous êtes entièrement responsable de l'utilisation de cet outil.**

## Contexte du projet

Projet réalisé pour un hackathon avec l'entreprise DattaK, spécialisée dans l'assurance cyber pour les entreprises.

## Licence

Ce projet est à but éducatif uniquement. Usage autorisé pour pentesting avec autorisation écrite, CTF, recherche en sécurité et environnements personnels.
