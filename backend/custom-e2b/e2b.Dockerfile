FROM ubuntu:22.04

# Install basic tools
RUN apt-get update && apt-get install -y curl wget git build-essential software-properties-common

# Install Python & Java & GCC
RUN apt-get install -y python3 python3-pip openjdk-17-jdk gcc g++

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g tsx typescript

# Install Go
RUN wget https://go.dev/dl/go1.21.6.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go1.21.6.linux-amd64.tar.gz
ENV PATH=$PATH:/usr/local/go/bin

# Install Rust
RUN apt-get install -y rustc
