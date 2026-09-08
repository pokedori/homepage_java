#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="/python-container/.venv"
VENV_PYTHON="${VENV_DIR}/bin/python"
LOCK_REQUIREMENTS_FILE="${SCRIPT_DIR}/requirements.lock.txt"
REQUIREMENTS_FILE="${SCRIPT_DIR}/requirements.txt"
MANAGE_PY_FILE="${SCRIPT_DIR}/manage.py"
DJANGO_HOST="${DJANGO_HOST:-0.0.0.0}"
DJANGO_PORT="${DJANGO_PORT:-8000}"

# requirements.lock.txt の更新手順:
#   1. docker compose up -d python-dev
#   2. docker compose exec python-dev sh -lc '
#        cd /python-container &&
#        rm -rf /tmp/lockenv &&
#        python -m venv /tmp/lockenv &&
#        . /tmp/lockenv/bin/activate &&
#        pip install -U pip setuptools wheel &&
#        pip install -r requirements.txt &&
#        {
#          echo "# Generated from python-container/requirements.txt on $(python --version | awk "{print \$2}")"
#          echo "# via \`pip freeze\` in the \`python-dev\` container."
#          pip freeze | sort
#        } > requirements.lock.txt
#      '

# 作業ディレクトリを共有フォルダに移動する
cd /python-container

# プロジェクト専用の仮想環境を用意し、以後の python/pip はそこを使う
if [ ! -x "${VENV_PYTHON}" ]; then
  echo "Creating project virtual environment at ${VENV_DIR}..."
  python -m venv "${VENV_DIR}"
fi

# shellcheck disable=SC1091
. "${VENV_DIR}/bin/activate"

# lock ファイルを優先し、なければ通常の requirements.txt を使う
if [ -f "${LOCK_REQUIREMENTS_FILE}" ]; then
  echo "Installing Python dependencies from requirements.lock.txt..."
  python -m pip install -r "${LOCK_REQUIREMENTS_FILE}"
elif [ -f "${REQUIREMENTS_FILE}" ]; then
  echo "Installing Python dependencies from requirements.txt..."
  python -m pip install -r "${REQUIREMENTS_FILE}"
fi

# 初期化が完了したことを通知する
echo "Python environment is ready."

# Django プロジェクトがある場合は開発サーバーを自動起動する
if [ -f "${MANAGE_PY_FILE}" ]; then
  echo "Starting Django development server at ${DJANGO_HOST}:${DJANGO_PORT}..."
  exec python manage.py runserver "${DJANGO_HOST}:${DJANGO_PORT}"
fi

# Django プロジェクトがまだない場合だけシェルを開ける
exec bash
