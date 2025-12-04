# Mode Live Attack - Documentation

## 🎯 Vue d'ensemble

Le **Mode Live Attack** est une nouvelle fonctionnalité du simulateur RiskyFillGen qui permet de visualiser des attaques cyber **en temps réel** avec des logs défilants, un scanner nmap intégré, et une interface dramatique pour les démonstrations.

## ✨ Fonctionnalités

### 1. Simulations d'Attaques en Temps Réel

Trois types d'attaques sont disponibles avec streaming de logs en direct :

- **🎣 Phishing** : Simulation complète d'une campagne de phishing
  - Collecte OSINT
  - Création de domaine malveillant
  - Envoi d'emails
  - Capture de credentials

- **🔐 Ransomware** : Simulation d'une attaque ransomware
  - Reconnaissance réseau
  - Exécution du payload
  - Propagation latérale
  - Chiffrement des données

- **🔓 Brute Force VPN** : Simulation d'attaque par force brute
  - Scan VPN
  - Password spraying
  - Validation des accès
  - Établissement de persistance

### 2. Scanner Nmap Sécurisé

- Scan **uniquement** des adresses locales (localhost, 127.0.0.1, IPs privées)
- Détection des ports ouverts
- Identification des services
- Affichage des résultats en tableau

**Sécurité** : Le scanner refuse automatiquement les adresses publiques pour éviter tout abus.

### 3. Terminal Animé

- Logs défilants en temps réel
- Coloration par niveau de criticité :
  - 🔵 **INFO** : Information générale
  - ✅ **SUCCESS** : Étape réussie
  - ⚠️ **WARNING** : Alerte
  - ❌ **ERROR** : Erreur
  - 🔥 **CRITICAL** : Critique (animation pulse)
- Auto-scroll
- Détails techniques extensibles

### 4. Barre de Progression

- Progression visuelle de 0% à 100%
- Changement de couleur selon l'avancement
- Animation pulse durant l'exécution

### 5. Contrôles de Simulation

- **Vitesse ajustable** : Lente (3s), Normale (1.5s), Rapide (0.5s)
- **Cible personnalisable** : localhost ou IP privée
- **Boutons de contrôle** : Démarrer, Arrêter, Effacer

## 🚀 Utilisation

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

### Accès à l'Application

1. Ouvrez votre navigateur sur `http://localhost:5173`
2. Cliquez sur le bouton **"🎯 Mode Live Attack"** dans le header
3. Sélectionnez un type d'attaque
4. (Optionnel) Cliquez sur "📡 Afficher Scan Nmap"
5. Configurez la cible et la vitesse
6. Cliquez sur **"▶ Lancer la Simulation"**

### Exemple de Scan Nmap

1. Activez le mode "Scan Nmap"
2. Entrez une cible (ex: `localhost` ou `127.0.0.1`)
3. Cliquez sur "Lancer Scan"
4. Les ports ouverts s'afficheront dans un tableau

**Cibles autorisées** :
- `localhost`
- `127.0.0.1` (et autres IPs 127.x.x.x)
- `192.168.x.x` (réseau privé)
- `10.x.x.x` (réseau privé)
- `172.16-31.x.x` (réseau privé)

## 🏗️ Architecture Technique

### Backend (NestJS)

```
backend/src/live-attack/
├── live-attack.types.ts      # Types TypeScript
├── live-attack.service.ts    # Logique métier et générateurs
├── live-attack.gateway.ts    # WebSocket Gateway
└── live-attack.module.ts     # Module NestJS
```

**Technologies** :
- **Socket.io** : Communication temps réel via WebSocket
- **node-nmap** : Wrapper Node.js pour nmap
- **Async Generators** : Streaming de logs progressif

### Frontend (React + TypeScript)

```
frontend/src/
├── LiveAttackSimulator.tsx   # Composant principal
├── LiveAttackSimulator.css   # Styles dédiés
└── types.ts                  # Types partagés
```

**Technologies** :
- **Socket.io-client** : Client WebSocket
- **React Hooks** : useState, useEffect, useRef
- **CSS Animations** : Pulse, slide-in, etc.

### Communication WebSocket

**Événements émis par le client** :
- `startLiveAttack` : Lancer une simulation
- `startNmapScan` : Lancer un scan nmap
- `stopAttack` : Arrêter la simulation

**Événements reçus par le client** :
- `connected` : Confirmation de connexion
- `attackLog` : Nouveau log d'attaque
- `attackComplete` : Simulation terminée
- `attackError` : Erreur durant la simulation
- `scanStarted` : Scan nmap démarré
- `scanComplete` : Résultats du scan
- `scanError` : Erreur de scan

## 🎨 Interface Utilisateur

### Mode Toggle

Deux modes disponibles :
- **📊 Mode Rapport** : Vue classique avec rapports détaillés
- **🎯 Mode Live Attack** : Vue temps réel avec terminal

### Design

- **Thème sombre** : Optimisé pour les démonstrations
- **Gradients modernes** : Violet, bleu, cyan
- **Animations fluides** : Transitions douces
- **Responsive** : Adapté mobile, tablette, desktop

## 📊 Cas d'Usage

### 1. Démonstrations Commerciales

- Mode dramatique pour impressionner les prospects
- Visualisation claire des menaces
- Progression en temps réel captivante

### 2. Formations de Sensibilisation

- Outil pédagogique visuel
- Étapes détaillées avec explications
- Comprendre les phases d'une attaque

### 3. Audits de Sécurité

- Identifier les ports ouverts (scan local)
- Simuler différents scénarios
- Évaluer la surface d'attaque

### 4. Présentations Techniques

- Interface professionnelle
- Logs techniques détaillés
- Exportable en vidéo/screenshot

## ⚠️ Sécurité et Utilisation Responsable

### ⚖️ AVERTISSEMENT LÉGAL IMPORTANT

**Scanner un système sans autorisation est ILLÉGAL dans la plupart des juridictions.**

📖 **Veuillez lire attentivement [SECURITY_USAGE.md](./SECURITY_USAGE.md) avant toute utilisation.**

### Scanner Nmap

- **Autorisations requises** : Vous DEVEZ avoir l'autorisation écrite du propriétaire
- **Confirmation obligatoire** : Popup de confirmation pour cibles non-locales
- **Logging d'audit** : Toutes les actions sont enregistrées
- **Utilisations légales** : Pentests autorisés, environnements personnels, CTF officiels
- **Scans légers** : -F (fast) ou -sV (version detection)

### Utilisations Autorisées

✅ Localhost et réseau personnel
✅ Pentests avec contrat signé
✅ Bug bounty programs officiels
✅ CTF et laboratoires éducatifs
✅ Vos propres serveurs/applications

### Utilisations Interdites

❌ Scanner sans autorisation écrite
❌ Réseaux d'entreprises sans contrat
❌ Sites web publics sans accord
❌ Infrastructures gouvernementales
❌ Toute utilisation "pour voir"

### Nature Éducative

- **Simulations uniquement** : Aucune vraie attaque
- **Logs fictifs** : Générés localement
- **Pas de payload réel** : Pas de malware
- **Environnement sûr** : Ne compromet rien

## 🔧 Configuration

### Backend

Port par défaut : `3000`

Configuration CORS dans `live-attack.gateway.ts` :
```typescript
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
```

### Frontend

URL du backend dans `LiveAttackSimulator.tsx` :
```typescript
const SOCKET_URL = 'http://localhost:3000'
```

## 🐛 Dépannage

### Le WebSocket ne se connecte pas

1. Vérifiez que le backend est démarré
2. Vérifiez la console pour les erreurs CORS
3. Assurez-vous que les ports 3000 et 5173 sont libres

### Le scan nmap échoue

1. Vérifiez que `nmap` est installé : `nmap --version`
2. Utilisez uniquement des adresses autorisées
3. Vérifiez les permissions (pas besoin de root pour scan basique)

### Les logs ne s'affichent pas

1. Ouvrez la console du navigateur
2. Vérifiez la connexion WebSocket
3. Relancez la simulation

## 📦 Dépendances

### Backend
```json
{
  "@nestjs/websockets": "^10.x",
  "@nestjs/platform-socket.io": "^10.x",
  "socket.io": "^4.x",
  "node-nmap": "^5.x"
}
```

### Frontend
```json
{
  "socket.io-client": "^4.x"
}
```

## 🚧 Améliorations Futures

- [ ] Export des logs en PDF/JSON
- [ ] Replay de simulations enregistrées
- [ ] Mode multi-joueur (plusieurs spectateurs)
- [ ] Graphiques de métriques en temps réel
- [ ] Scénarios d'attaques personnalisables
- [ ] Intégration avec des SIEM réels
- [ ] Mode "Defense" pour contrer l'attaque

## 📝 Notes de Développement

### Ajout d'un Nouveau Type d'Attaque

1. Ajouter l'enum dans `live-attack.types.ts`
2. Créer le générateur dans `live-attack.service.ts`
3. Ajouter le case dans le gateway
4. Ajouter l'option dans le frontend

Exemple :
```typescript
async* generateMyAttackLogs(config: LiveAttackConfig): AsyncGenerator<AttackLog> {
  const logs: AttackLog[] = [
    // Vos étapes ici
  ];

  for (const log of logs) {
    await this.delay(this.getDelayForSpeed(config.speed));
    yield log;
  }
}
```

## 🤝 Contribution

Ce projet a été développé pour le hackathon DattaK dans un contexte éducatif.

## 📄 Licence

Usage éducatif uniquement.

---

**Développé avec ❤️ pour l'éducation en cybersécurité**
