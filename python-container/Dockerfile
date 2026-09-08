FROM python:3.12-slim

# `__pycache__` や `.pyc` を生成しない。コンテナ内の不要ファイルを減らせる。
# Python の標準出力/標準エラー出力をバッファしない。`docker logs` に即時反映されやすい。
# `pip` のダウンロードキャッシュを残さない。イメージやコンテナ内の余計な容量を抑えられる。
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1
# ENV PIP_NO_CACHE_DIR=1

WORKDIR /python-container

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    curl \
    wget \
    vim \
    nano \
    less \
    procps \
    tree \
    htop \
    jq \
    unzip \
    bash-completion \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir --upgrade pip setuptools wheel

CMD ["bash"]
