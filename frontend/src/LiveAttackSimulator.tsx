import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import type { AttackLog, LiveAttackType, NmapScanResult } from './types'
import VulnerabilityReport from './VulnerabilityReport'
import './LiveAttackSimulator.css'

const SOCKET_URL = 'http://localhost:3000'

interface LiveAttackSimulatorProps {
  onClose?: () => void
}

export default function LiveAttackSimulator({ onClose }: LiveAttackSimulatorProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [logs, setLogs] = useState<AttackLog[]>([])
  const [selectedAttack, setSelectedAttack] = useState<LiveAttackType>('phishing')
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [target, setTarget] = useState('localhost')
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal')
  const [scanResult, setScanResult] = useState<NmapScanResult | null>(null)
  const [showNmapScan, setShowNmapScan] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [vulnReport, setVulnReport] = useState<any>(null)
  const [isVulnScanning, setIsVulnScanning] = useState(false)
  const [showVulnReport, setShowVulnReport] = useState(false)

  const logsEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialiser la connexion Socket.io
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
    })

    newSocket.on('connect', () => {
      console.log('Connected to server')
    })

    newSocket.on('connected', (data) => {
      console.log('Server confirmation:', data)
    })

    newSocket.on('attackLog', (log: AttackLog) => {
      setLogs((prevLogs) => [...prevLogs, log])
      setProgress(log.progress)
    })

    newSocket.on('attackComplete', () => {
      setIsRunning(false)
      setIsCompleted(true)
    })

    newSocket.on('attackError', (data) => {
      console.error('Attack error:', data)
      setIsRunning(false)
    })

    newSocket.on('scanStarted', (data) => {
      console.log('Scan started:', data)
    })

    newSocket.on('scanComplete', (data) => {
      setScanResult(data.result)
      setIsScanning(false)
    })

    newSocket.on('scanError', (data) => {
      console.error('Scan error:', data)
      setIsScanning(false)
      alert(`Erreur de scan: ${data.message}`)
    })

    newSocket.on('vulnScanStarted', (data) => {
      console.log('Vulnerability scan started:', data)
    })

    newSocket.on('vulnScanComplete', (data) => {
      console.log('Vulnerability scan complete:', data)
      setVulnReport(data.report)
      setIsVulnScanning(false)
      setShowVulnReport(true)
    })

    newSocket.on('vulnScanError', (data) => {
      console.error('Vulnerability scan error:', data)
      setIsVulnScanning(false)
      alert(`Erreur scan vulnérabilités: ${data.message}`)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  useEffect(() => {
    // Auto-scroll vers le bas quand de nouveaux logs arrivent
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const startAttack = () => {
    if (!socket) return

    setLogs([])
    setProgress(0)
    setIsRunning(true)
    setIsCompleted(false)
    setScanResult(null)

    socket.emit('startLiveAttack', {
      attackType: selectedAttack,
      target,
      speed,
    })
  }

  const stopAttack = () => {
    if (!socket) return
    socket.emit('stopAttack')
    setIsRunning(false)
  }

  const isLocalTarget = (target: string): boolean => {
    const localPatterns = [
      /^localhost$/i,
      /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
      /^192\.168\.\d{1,3}\.\d{1,3}$/,
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}$/,
    ];
    return localPatterns.some(pattern => pattern.test(target));
  }

  const startNmapScan = () => {
    if (!socket || isScanning) return

    // Vérifier si c'est une cible non-locale
    if (!isLocalTarget(target)) {
      const confirmed = window.confirm(
        `⚠️ AVERTISSEMENT DE SÉCURITÉ ⚠️\n\n` +
        `Vous êtes sur le point de scanner une adresse NON-LOCALE:\n${target}\n\n` +
        `IMPORTANT:\n` +
        `• Vous DEVEZ avoir l'autorisation explicite du propriétaire\n` +
        `• Scanner sans autorisation est ILLÉGAL\n` +
        `• Cette action sera enregistrée dans les logs\n` +
        `• Vous êtes responsable de l'usage de cet outil\n\n` +
        `Avez-vous l'autorisation explicite de scanner cette cible ?`
      );

      if (!confirmed) {
        alert('Scan annulé. Utilisez uniquement sur des systèmes autorisés.');
        return;
      }
    }

    setIsScanning(true)
    setScanResult(null)

    socket.emit('startNmapScan', {
      target,
      scanType: 'quick',
    })
  }

  const startVulnerabilityScan = () => {
    if (!socket || isVulnScanning) return

    if (!target) {
      alert('Veuillez entrer une cible (URL ou adresse IP)')
      return
    }

    // Confirmation pour scan de vulnérabilités
    const confirmed = window.confirm(
      `⚠️ SCAN DE VULNÉRABILITÉS ⚠️\n\n` +
      `Cible: ${target}\n\n` +
      `Ce scan va :\n` +
      `• Scanner les ports ouverts (nmap)\n` +
      `• Analyser les headers HTTP\n` +
      `• Détecter les technologies\n` +
      `• Vérifier le SSL/TLS\n` +
      `• Identifier les vulnérabilités\n\n` +
      `Assurez-vous d'avoir l'autorisation !\n\n` +
      `Continuer ?`
    )

    if (!confirmed) {
      return
    }

    setIsVulnScanning(true)
    setVulnReport(null)
    setShowVulnReport(false)

    socket.emit('scanVulnerabilities', {
      target,
    })
  }

  const getLogLevelClass = (level: string): string => {
    switch (level) {
      case 'success':
        return 'log-success'
      case 'warning':
        return 'log-warning'
      case 'error':
        return 'log-error'
      case 'critical':
        return 'log-critical'
      default:
        return 'log-info'
    }
  }

  const getLogLevelIcon = (level: string): string => {
    switch (level) {
      case 'success':
        return '✓'
      case 'warning':
        return '⚠'
      case 'error':
        return '✗'
      case 'critical':
        return '🔥'
      default:
        return '→'
    }
  }

  return (
    <div className="live-attack-simulator">
      <div className="simulator-header">
        <h2>🎯 Simulation d'Attaque en Temps Réel</h2>
        {onClose && (
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        )}
      </div>

      <div className="simulator-controls">
        <div className="control-group">
          <label>Type d'attaque</label>
          <select
            value={selectedAttack}
            onChange={(e) => setSelectedAttack(e.target.value as LiveAttackType)}
            disabled={isRunning}
          >
            <option value="phishing">Phishing</option>
            <option value="ransomware">Ransomware</option>
            <option value="brute_force_vpn">Brute Force VPN</option>
          </select>
        </div>

        <div className="control-group">
          <label>Cible (adresse IP ou domaine)</label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            disabled={isRunning}
            placeholder="Ex: localhost, 127.0.0.1, 192.168.1.1, example.com"
          />
        </div>

        <div className="control-group">
          <label>Vitesse</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(e.target.value as 'slow' | 'normal' | 'fast')}
            disabled={isRunning}
          >
            <option value="slow">Lente (3s)</option>
            <option value="normal">Normale (1.5s)</option>
            <option value="fast">Rapide (0.5s)</option>
          </select>
        </div>

        <div className="control-actions">
          {!isRunning ? (
            <>
              <button className="start-btn" onClick={startAttack}>
                ▶ Lancer la Simulation
              </button>
              <button
                className="scan-btn"
                onClick={() => setShowNmapScan(!showNmapScan)}
              >
                📡 {showNmapScan ? 'Masquer' : 'Afficher'} Scan Nmap
              </button>
              <button
                className="vuln-scan-btn"
                onClick={startVulnerabilityScan}
                disabled={isVulnScanning}
              >
                🔍 {isVulnScanning ? 'Scan Vulnérabilités...' : 'Analyser les Vulnérabilités'}
              </button>
            </>
          ) : (
            <button className="stop-btn" onClick={stopAttack}>
              ⏹ Arrêter
            </button>
          )}
        </div>
      </div>

      {showNmapScan && (
        <div className="nmap-section">
          <div className="nmap-header">
            <h3>🔍 Scanner Nmap (Sécurisé)</h3>
            <button
              className="nmap-scan-btn"
              onClick={startNmapScan}
              disabled={isScanning}
            >
              {isScanning ? 'Scan en cours...' : 'Lancer Scan'}
            </button>
          </div>
          <div className="nmap-disclaimer">
            ⚠️ <strong>AVERTISSEMENT LÉGAL</strong> : Vous devez avoir l'autorisation explicite du propriétaire du système avant tout scan.
            L'utilisation non autorisée est illégale et peut entraîner des poursuites judiciaires.
            Cet outil est destiné uniquement aux tests de sécurité autorisés, pentests et environnements personnels.
          </div>

          {scanResult && (
            <div className="nmap-result">
              <h4>Résultats du scan : {scanResult.host}</h4>
              {scanResult.ports.length > 0 ? (
                <table className="ports-table">
                  <thead>
                    <tr>
                      <th>Port</th>
                      <th>État</th>
                      <th>Service</th>
                      <th>Version</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scanResult.ports.map((port, idx) => (
                      <tr key={idx}>
                        <td>{port.port}</td>
                        <td className="port-open">{port.state}</td>
                        <td>{port.service}</td>
                        <td>{port.version || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucun port ouvert détecté</p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="progress-section">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
              backgroundColor:
                progress === 100 ? '#10b981' : progress > 50 ? '#f59e0b' : '#3b82f6',
            }}
          />
        </div>
        <div className="progress-text">{progress}% - {isCompleted ? 'Terminé' : isRunning ? 'En cours...' : 'En attente'}</div>
      </div>

      <div className="terminal-section">
        <div className="terminal-header">
          <span className="terminal-title">📟 Terminal - Logs en temps réel</span>
          <button
            className="clear-logs-btn"
            onClick={() => setLogs([])}
            disabled={isRunning}
          >
            Effacer
          </button>
        </div>
        <div className="terminal">
          {logs.length === 0 ? (
            <div className="terminal-empty">
              Aucun log. Lancez une simulation pour voir les attaques en action...
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className={`log-entry ${getLogLevelClass(log.level)}`}>
                <span className="log-icon">{getLogLevelIcon(log.level)}</span>
                <span className="log-timestamp">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span className="log-message">{log.message}</span>
                {log.details && (
                  <div className="log-details">{log.details}</div>
                )}
              </div>
            ))
          )}
          <div ref={logsEndRef} />
        </div>
      </div>

      {showVulnReport && vulnReport && (
        <VulnerabilityReport report={vulnReport} />
      )}

      {isCompleted && (
        <div className="completion-message">
          <h3>✅ Simulation Terminée</h3>
          <p>
            L'attaque a été simulée avec succès. Ces étapes montrent comment DattaK
            peut détecter et prévenir ce type d'attaque.
          </p>
        </div>
      )}
    </div>
  )
}
