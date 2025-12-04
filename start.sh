#!/bin/bash

# Script de démarrage pour le simulateur d'attaques DattaK

echo "========================================="
echo "  DattaK - Simulateur d'Attaques Cyber"
echo "========================================="
echo ""

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js v18 ou supérieur."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Démarrer le backend
echo "🚀 Démarrage du backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances backend..."
    npm install
fi

npm run start:dev &
BACKEND_PID=$!
echo "✅ Backend démarré (PID: $BACKEND_PID) sur http://localhost:3000"
echo ""

# Attendre que le backend soit prêt
sleep 5

# Démarrer le frontend
echo "🎨 Démarrage du frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances frontend..."
    npm install
fi

npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend démarré (PID: $FRONTEND_PID)"
echo ""

echo "========================================="
echo "✨ Application prête !"
echo "========================================="
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔌 Backend:  http://localhost:3000"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les serveurs"
echo ""

# Attendre et gérer l'arrêt
trap "echo ''; echo '🛑 Arrêt des serveurs...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT SIGTERM

wait
