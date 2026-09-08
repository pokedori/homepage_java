#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_JSON_FILE="${SCRIPT_DIR}/package.json"
PACKAGE_LOCK_FILE="${SCRIPT_DIR}/package-lock.json"

cd /react-container

if [ -f "${PACKAGE_JSON_FILE}" ]; then
  if [ -f "${PACKAGE_LOCK_FILE}" ]; then
    echo "Installing Node.js dependencies from package-lock.json..."
    npm ci
  else
    echo "Installing Node.js dependencies from package.json..."
    npm install
  fi
fi

echo "React environment is ready."

exec bash
