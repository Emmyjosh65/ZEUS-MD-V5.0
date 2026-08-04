#!/bin/bash
echo "╔══════════════════════════════════════╗"
echo "║        ZEUS-MD Bot Launcher          ║"
echo "╚══════════════════════════════════════╝"
echo "Node: $(node -v)"
echo "NPM : $(npm -v)"

if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install --no-audit --no-fund || { echo "❌ npm install failed"; exit 1; }
else
  echo "✅ Dependencies already installed."
fi

if [ ! -d "sessions" ] || [ -z "$(ls -A sessions 2>/dev/null)" ]; then
  echo ""
  echo "⚠️  No WhatsApp session found."
  echo "   The bot will ASK for your number, then print a PAIRING CODE."
  echo ""
fi

exec node index.js
