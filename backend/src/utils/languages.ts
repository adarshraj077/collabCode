export const LANGUAGES = {
  javascript: { image: 'ts-runner', ext: 'js', cmd: ['node', '/code/main.js'], timeout: 60, memory: '64m' },
  typescript: { image: 'ts-runner', ext: 'ts', cmd: ['npx', '-y', 'tsx', '/code/main.ts'], timeout: 60, memory: '64m' },
  c: { image: 'gcc:latest', ext: 'c', cmd: ['gcc', '/code/main.c', '-o', '/tmp/out', '&&', '/tmp/out'], timeout: 60, memory: '64m' },
  cpp: { image: 'gcc:latest', ext: 'cpp', cmd: ['g++', '/code/main.cpp', '-o', '/tmp/out', '&&', '/tmp/out'], timeout: 60, memory: '64m' },
  go: { image: 'golang:alpine', ext: 'go', cmd: ['/usr/local/go/bin/go', 'run', '/code/main.go'], timeout: 60, memory: '256m' },
  python: { image: 'python:latest', ext: 'py', cmd: ['python3', '/code/main.py'], timeout: 60, memory: '128m' },
  rust: { image: 'rust:latest', ext: 'rs', cmd: ['rustc', '/code/main.rs', '-o', '/tmp/out', '&&', '/tmp/out'], timeout: 60, memory: '128m' },
  java: { image: 'openjdk:latest', ext: 'java', cmd: ['javac', '/code/Main.java', '&&', 'java', '-cp', '/code', 'Main'], timeout: 60, memory: '256m' },
};

export interface langConfig {
  image: string,
  ext: string,
  cmd: string[],
  timeout: number,
  memory: string,
}


