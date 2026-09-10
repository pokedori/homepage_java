FROM eclipse-temurin:25-jdk

WORKDIR /java-container

RUN apt-get update && apt-get install -y --no-install-recommends \
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