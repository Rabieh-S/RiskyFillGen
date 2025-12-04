# 🔍 Débogage du Scanner Nmap

## Problème Connu

Le scan depuis le frontend peut afficher "aucun port ouvert" alors que `nmap` en ligne de commande trouve des ports.

## 🛠️ Étapes de Débogage

### 1. Lancer le Backend en Mode Dev

```bash
cd backend
npm run start:dev
```

Le backend va maintenant afficher des logs détaillés :
- `[NMAP] Starting scan with options: ...`
- `[NMAP] Scan complete, raw data: ...`
- `[NMAP] Host data: ...`
- `[NMAP] Found X open ports`
- `[NMAP] Final result: ...`

### 2. Lancer le Frontend

```bash
# Dans un autre terminal
cd frontend
npm run dev
```

### 3. Effectuer un Scan

1. Allez sur http://localhost:5173
2. Mode Live Attack → Afficher Scan Nmap
3. Cible : `127.0.0.1` ou `localhost`
4. Cliquez "Lancer Scan"

### 4. Analyser les Logs Backend

Regardez la console du backend pour voir :

#### A. Les options passées à nmap
```
[NMAP] Starting scan with options: -sV -F -T4
```

#### B. Les données brutes retournées
```json
[NMAP] Scan complete, raw data: [
  {
    "hostname": "localhost",
    "ip": "127.0.0.1",
    "openPorts": [...],
    ...
  }
]
```

#### C. Le parsing des ports
```
[NMAP] Found 8 open ports
[NMAP] Port info: { port: 22, state: 'open', service: 'ssh', ... }
```

## 🔧 Solutions Possibles

### Solution 1 : Vérifier l'installation de nmap

```bash
# Vérifier que nmap est installé
nmap --version

# Si pas installé (Ubuntu/Debian)
sudo apt-get install nmap

# Si pas installé (macOS)
brew install nmap
```

### Solution 2 : Permissions

Le backend Node.js doit pouvoir exécuter nmap :

```bash
# Vérifier les permissions
which nmap
ls -la $(which nmap)

# Si besoin (pas recommandé en prod)
sudo chmod +x /usr/bin/nmap
```

### Solution 3 : Options de Scan

Si le scan quick (-F) ne fonctionne pas, essayez un scan complet en modifiant temporairement le code :

Dans `live-attack.service.ts`, changez :
```typescript
const scanOptions = '-sV -T4'  // Sans -F
```

### Solution 4 : Parser XML au lieu de JSON

node-nmap peut avoir des problèmes de parsing. Alternative : utiliser l'output XML.

Ajoutez dans `live-attack.service.ts` :

```typescript
const scanOptions = '-sV -F -T4 -oX -';  // Output XML to stdout
```

Puis parser le XML manuellement.

## 🐛 Problèmes Connus avec node-nmap

### 1. Structure de données variable

`node-nmap` peut retourner des structures différentes selon :
- La version de nmap
- Les options utilisées
- Le système d'exploitation

### 2. Ports dans différentes propriétés

Les ports peuvent être dans :
- `data[0].openPorts` (format attendu)
- `data[0].ports` (fallback)
- `data[0].host[0].ports[0].port` (format XML parsé)

### 3. Scan de localhost

Certains systèmes bloquent les scans locaux par défaut.

## 📋 Checklist de Débogage

- [ ] nmap est installé : `nmap --version`
- [ ] Backend lancé en mode dev : `npm run start:dev`
- [ ] Console backend visible et logs affichés
- [ ] Scan lancé depuis le frontend
- [ ] Logs `[NMAP]` visibles dans la console backend
- [ ] Structure de données `raw data` inspectée
- [ ] Ports présents dans `openPorts` ou `ports` ?

## 🔍 Exemple de Logs Attendus

### Si ça marche :
```
[NMAP] Starting scan with options: -sV -F -T4
[NMAP SCAN] Target: 127.0.0.1 | Type: quick | Timestamp: ...
[SECURITY] Assurez-vous d'avoir l'autorisation explicite pour scanner cette cible.
[NMAP] Scan complete, raw data: [{
  "hostname": "localhost",
  "ip": "127.0.0.1",
  "openPorts": [
    { "port": 22, "service": "ssh", "state": "open", "version": "OpenSSH 9.6p1" },
    { "port": 80, "service": "http", "state": "open", "version": "nginx 1.24.0" },
    ...
  ]
}]
[NMAP] Found 8 open ports
[NMAP] Final result: {
  "host": "127.0.0.1",
  "ports": [
    { "port": 22, "state": "open", "service": "ssh", "version": "OpenSSH 9.6p1" },
    ...
  ],
  "scanTime": 1733327880000
}
```

### Si ça ne marche pas :
```
[NMAP] Scan complete, raw data: []
[NMAP] No data returned from scan
```

ou

```
[NMAP] Scan complete, raw data: [{...}]
[NMAP] No openPorts array in hostData
[NMAP] Trying ports property: undefined
```

## 💡 Solution Alternative : Exec Direct

Si node-nmap ne fonctionne pas, on peut utiliser `child_process.exec` directement :

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async scanTarget(target: string): Promise<NmapScanResult> {
  try {
    const { stdout } = await execAsync(`nmap -sV -F ${target} -oX -`);
    // Parser le XML
    // ...
  } catch (error) {
    throw new Error(`Scan failed: ${error.message}`);
  }
}
```

## 📞 Aide Supplémentaire

1. **Partagez les logs** : Copiez-collez les logs `[NMAP]` de la console backend
2. **Version nmap** : `nmap --version`
3. **Système** : Ubuntu ? macOS ? Windows ?
4. **Scan manuel** : Résultat de `nmap -sV -F 127.0.0.1`

---

**Une fois les logs visibles, on pourra ajuster le parsing selon la structure réelle des données retournées par node-nmap sur votre système.**
