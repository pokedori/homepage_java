#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JAVA_HOME_DIR="/usr/lib/jvm/java-25-jdk-temurin"

# Java 環境の準備（必要に応じて）
echo "Java environment is ready."

# コンテナが終了しないように、無限に待機するプロセスを実行し続ける
# ユーザーは 'docker compose exec java-dev bash' でこのコンテナに入って作業します。
echo "Container is running. Use 'docker compose exec java-dev bash' to enter."

echo "Java environment is ready."

cd /java-container/springboot-app

echo "Starting Spring Boot..."

exec mvn spring-boot:run