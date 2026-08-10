#!/bin/bash

source "$HOME/emotion-venv/bin/activate"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

nvm use 22

cleanup() {
    echo ""
    echo "Stopping the servers now"
    kill $(jobs -p) 2>/dev/null
    fuser -k 8000/tcp 2>/dev/null
    fuser -k 8080/tcp 2>/dev/null
    fuser -k 5173/tcp 2>/dev/null
    wait 2>/dev/null
    echo "All Done"
}

trap cleanup EXIT INT TERM

# Kill old instances left on our ports
uvicorn emotionDetector:app --host 0.0.0.0 --port 8000 &
uvicorn grammarDetector:app  --host 0.0.0.0 --port 8080 &

# Start frontend
cd open-screen || exit 1
npm run dev -- --host &

wait