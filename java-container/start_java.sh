#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JAVA_HOME_DIR="/usr/lib/jvm/java-25-jdk-temurin"

echo "Java environment is ready."
