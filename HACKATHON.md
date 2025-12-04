# Simulateur d'Attaques Cyber - DattaK

## Présentation du Projet

Ce simulateur a été développé pour le hackathon avec **DattaK**, une entreprise spécialisée dans l'assurance cyber pour les entreprises.

## Objectif

Créer un outil éducatif et commercial permettant de :
1. Visualiser les étapes détaillées d'attaques cyber courantes
2. Démontrer les capacités de détection de DattaK
3. Sensibiliser aux mesures de prévention nécessaires

## Fonctionnalités Implémentées

### ✅ Interface Utilisateur Interactive
- Sélection visuelle entre 3 types d'attaques
- Design moderne et professionnel
- Responsive (mobile, tablette, desktop)

### ✅ Trois Scénarios d'Attaque Complets

#### 1. Ransomware (Risque : CRITIQUE)
- 8 étapes détaillées : reconnaissance, phishing, exécution, escalade, propagation, exfiltration, chiffrement, rançon
- 5 méthodes de détection DattaK (EDR, SIEM, IDS/IPS, Email Security, File Integrity)
- 8 mesures de prévention prioritaires

#### 2. Phishing (Risque : ÉLEVÉ)
- 8 étapes détaillées : OSINT, infrastructure, prétexte, création contenu, campagne, collecte credentials, validation, exploitation
- 5 méthodes de détection DattaK (Email Security, Anti-phishing, SIEM, Proxy, Authentification)
- 8 mesures de prévention prioritaires

#### 3. Brute Force VPN (Risque : ÉLEVÉ)
- 8 étapes détaillées : reconnaissance, énumération, dictionnaires, configuration outils, password spraying, brute force, validation, persistance
- 5 méthodes de détection DattaK (VPN Logs, SIEM, IDS/IPS, Threat Intelligence, Behavioral Analytics)
- 8 mesures de prévention prioritaires

### ✅ Informations Détaillées

Pour chaque attaque, le simulateur affiche :
- **Description** : Contexte et nature de l'attaque
- **Étapes de l'attaque** : Déroulement chronologique avec détails techniques
- **Détections DattaK** : Outils, méthodes, niveau de confiance
- **Mesures de prévention** : Catégories, priorité, implémentation
- **Impact estimé** : Conséquences financières et opérationnelles

## Architecture Technique

### Backend (NestJS)
```
backend/src/attack-simulator/
├── types.ts                    # Interfaces TypeScript
├── attack-simulator.service.ts # Logique métier et données
├── attack-simulator.controller.ts # Endpoints API REST
└── attack-simulator.module.ts  # Module NestJS
```

### Frontend (React + TypeScript)
```
frontend/src/
├── types.ts     # Interfaces TypeScript
├── App.tsx      # Composant principal
├── App.css      # Styles modernes
└── index.css    # Styles globaux
```

### API REST
- `GET /api/attack-simulator/attack-types` : Liste des types d'attaques
- `POST /api/attack-simulator/simulate` : Lance une simulation

## Points Forts du Projet

### 🎯 Valeur Commerciale
- Outil de démonstration pour les prospects DattaK
- Sensibilisation aux risques cyber
- Mise en avant des capacités de détection
- Génération de leads qualifiés

### 🔒 Expertise Technique
- Scénarios d'attaque réalistes basés sur le MITRE ATT&CK
- Détails techniques précis
- Mesures de prévention alignées avec les standards (ISO 27001, NIST)
- Estimations d'impact chiffrées

### 💎 Qualité de Développement
- Architecture modulaire et extensible
- Code TypeScript typé
- Design moderne et responsive
- Performance optimisée
- Facilement déployable

### 🚀 Extensibilité
- Ajout facile de nouveaux types d'attaques
- Personnalisation des détections par client
- Intégration possible avec des systèmes existants
- Possibilité d'ajouter des analytics

## Démo Live

### Démarrage Rapide
```bash
# Option 1 : Script automatique
./start.sh

# Option 2 : Démarrage manuel
# Terminal 1 - Backend
cd backend
npm install
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### Accès
- Frontend : http://localhost:5173
- Backend API : http://localhost:3000

## Cas d'Usage pour DattaK

### 1. Démonstration Commerciale
- Présentation aux prospects lors de rendez-vous commerciaux
- Démonstration en salon professionnel
- Webinaires de sensibilisation

### 2. Outil Marketing
- Lead magnet sur le site web
- Contenu pour campagnes email
- Support pour articles de blog/LinkedIn

### 3. Formation Client
- Sensibilisation des équipes IT des clients
- Support pour audits de sécurité
- Outil pédagogique pour RSSI

### 4. Analyse de Risques
- Aide à l'évaluation des risques clients
- Support pour définir les primes d'assurance
- Identification des besoins en formation

## Améliorations Futures Possibles

### Phase 2 (court terme)
- [ ] Export PDF des rapports de simulation
- [ ] Mode comparaison : avec/sans protection DattaK
- [ ] Personnalisation par secteur d'activité
- [ ] Statistiques d'utilisation

### Phase 3 (moyen terme)
- [ ] Scénarios supplémentaires (DDoS, Supply Chain, IoT)
- [ ] Simulations interactives avec choix multiples
- [ ] Intégration avec CRM pour le tracking des leads
- [ ] Version multilingue

### Phase 4 (long terme)
- [ ] IA pour générer des scénarios personnalisés
- [ ] Intégration avec solutions SIEM réelles
- [ ] Marketplace de scénarios communautaires
- [ ] Version mobile native

## Métriques de Succès

Pour le hackathon, nous pourrions mesurer :
- ✅ Complétude : 3 types d'attaques ✓
- ✅ Détails : 8+ étapes par attaque ✓
- ✅ Détections : 5+ méthodes par attaque ✓
- ✅ Préventions : 8+ mesures par attaque ✓
- ✅ UX/Design : Interface moderne ✓
- ✅ Technique : Architecture robuste ✓

## Équipe

Développé pour le hackathon DattaK
Contexte : Epitech MSc 2026 - T9

## Conclusion

Ce simulateur représente un outil complet qui démontre non seulement les capacités techniques de DattaK, mais aussi la valeur ajoutée de leurs services d'assurance cyber. L'approche éducative permet de sensibiliser efficacement tout en générant des opportunités commerciales.

L'outil est production-ready et peut être déployé immédiatement pour des démonstrations clients.
