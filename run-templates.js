#!/usr/bin/env node
// Script to run the Paint Visualizer with Style Templates

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('Starting Paint Visualizer with Style Templates...');

// Start the server
const server = spawn('bun', ['--hot', 'template-server.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.kill();
  process.exit(0);
});

// Open the browser after a short delay
setTimeout(() => {
  console.log('Opening browser...');
  const open = spawn('open', ['http://localhost:3001'], {
    stdio: 'inherit',
    shell: true
  });
}, 1000);
