export const LANGUAGES = {
  javascript:  { image: 'ts-runner',    ext: 'js',  cmd: ['bun', 'run', '/code/main.js'] , timeout: 60, memory: '64m'},
  typescript:  { image: 'ts-runner',    ext: 'ts',  cmd: ['bun', 'run', '/code/main.ts'], timeout: 60, memory: '64m' },
  c:           { image: 'gcc:latest',     ext: 'c',   cmd: ['sh', '-c', 'gcc /code/main.c -o /tmp/out && /tmp/out'] , timeout: 60, memory: '64m'},
  cpp:         { image: 'gcc:latest',     ext: 'cpp', cmd: ['sh', '-c', 'g++ /code/main.cpp -o /tmp/out && /tmp/out'] , timeout: 60, memory: '64m'},
  go:          { image: 'golang:alpine',  ext: 'go',  cmd: ['go', 'run', '/code/main.go'], timeout: 60, memory: '256m' },
};

export interface langConfig{
    image:string,
    ext:string,
    cmd:string[],
    timeout: number,
    memory: string,
}