FROM node:20-bookworm-slim

WORKDIR /react-container

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

CMD ["bash"]
