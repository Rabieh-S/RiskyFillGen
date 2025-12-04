import { useState, useEffect } from 'react'
import './App.css'
import type { AttackTypeOption, AttackSimulationResult } from './types'
import LiveAttackSimulator from './LiveAttackSimulator'

const API_URL = 'http://localhost:3000'

function App() {
  const [attackTypes, setAttackTypes] = useState<AttackTypeOption[]>([])
  const [selectedAttack, setSelectedAttack] = useState<string>('')
  const [simulation, setSimulation] = useState<AttackSimulationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showLiveMode, setShowLiveMode] = useState(false)

  useEffect(() => {
    fetchAttackTypes()
  }, [])

  const fetchAttackTypes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/attack-simulator/attack-types`)
      const data = await response.json()
      setAttackTypes(data.data)
    } catch (err) {
      setError('Erreur lors du chargement des types d\'attaques')
      console.error(err)
    }
  }

  const handleSimulate = async () => {
    if (!selectedAttack) {
      setError('Veuillez sélectionner un type d\'attaque')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/attack-simulator/simulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attackType: selectedAttack }),
      })

      const data = await response.json()
      setSimulation(data.data)
    } catch (err) {
      setError('Erreur lors de la simulation')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return '#dc2626'
      case 'high':
        return '#ea580c'
      case 'medium':
        return '#f59e0b'
      case 'low':
        return '#84cc16'
      default:
        return '#6b7280'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return '🔴'
      case 'high':
        return '🟠'
      case 'medium':
        return '🟡'
      case 'low':
        return '🟢'
      default:
        return '⚪'
    }
  }

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return '✅'
      case 'medium':
        return '⚠️'
      case 'low':
        return '❓'
      default:
        return '⚪'
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>DattaK - Simulateur d'Attaques Cyber</h1>
        <p className="subtitle">Comprendre, Détecter, Prévenir</p>
        <div className="mode-toggle">
          <button
            className={`mode-btn ${!showLiveMode ? 'active' : ''}`}
            onClick={() => setShowLiveMode(false)}
          >
            📊 Mode Rapport
          </button>
          <button
            className={`mode-btn ${showLiveMode ? 'active' : ''}`}
            onClick={() => setShowLiveMode(true)}
          >
            🎯 Mode Live Attack
          </button>
        </div>
      </header>

      <div className="container">
        {showLiveMode ? (
          <LiveAttackSimulator />
        ) : (
          <>
        <div className="selection-section">
          <h2>Choisissez un type d'attaque</h2>
          <div className="attack-types">
            {attackTypes.map((type) => (
              <div
                key={type.value}
                className={`attack-card ${selectedAttack === type.value ? 'selected' : ''}`}
                onClick={() => setSelectedAttack(type.value)}
              >
                <h3>{type.label}</h3>
                <p>{type.description}</p>
              </div>
            ))}
          </div>

          <button
            className="simulate-btn"
            onClick={handleSimulate}
            disabled={!selectedAttack || loading}
          >
            {loading ? 'Simulation en cours...' : 'Lancer la simulation'}
          </button>

          {error && <div className="error">{error}</div>}
        </div>

        {simulation && (
          <div className="results">
            <div className="result-header">
              <h2>{simulation.attackName}</h2>
              <div
                className="risk-badge"
                style={{ backgroundColor: getRiskColor(simulation.riskLevel) }}
              >
                Risque : {simulation.riskLevel.toUpperCase()}
              </div>
            </div>

            <div className="description-box">
              <p>{simulation.description}</p>
              <div className="impact">
                <strong>Impact estimé :</strong> {simulation.estimatedImpact}
              </div>
            </div>

            <div className="section">
              <h3>📋 Étapes de l'attaque</h3>
              <div className="steps">
                {simulation.steps.map((step) => (
                  <div key={step.stepNumber} className="step-card">
                    <div className="step-number">Étape {step.stepNumber}</div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                    <div className="technical-details">
                      <strong>Détails techniques :</strong> {step.technicalDetails}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section detections-section">
              <h3>✅ Ce que DattaK détecte</h3>
              <div className="detections">
                {simulation.dattakDetections.map((detection, index) => (
                  <div key={index} className="detection-card">
                    <div className="detection-header">
                      <span className="confidence-icon">
                        {getConfidenceIcon(detection.confidence)}
                      </span>
                      <h4>{detection.tool}</h4>
                      <span className="confidence-badge">
                        Confiance : {detection.confidence}
                      </span>
                    </div>
                    <div className="detection-method">
                      <strong>Méthode :</strong> {detection.method}
                    </div>
                    <p>{detection.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="section prevention-section">
              <h3>🛡️ Mesures de prévention recommandées</h3>
              <div className="preventions">
                {simulation.preventionMeasures.map((measure, index) => (
                  <div key={index} className="prevention-card">
                    <div className="prevention-header">
                      <span className="priority-icon">
                        {getPriorityIcon(measure.priority)}
                      </span>
                      <div>
                        <div className="category-badge">{measure.category}</div>
                        <h4>{measure.measure}</h4>
                      </div>
                      <span className="priority-badge">
                        Priorité : {measure.priority}
                      </span>
                    </div>
                    <div className="implementation">
                      <strong>Implémentation :</strong> {measure.implementation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="footer-cta">
              <p>
                <strong>DattaK</strong> vous protège contre ces menaces avec une surveillance
                24/7 et des experts en cybersécurité.
              </p>
              <button className="cta-button">Demander une démo</button>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
