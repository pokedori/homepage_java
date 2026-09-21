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
    tmux \
    && rm -rf /var/lib/apt/lists/*
