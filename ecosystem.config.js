module.exports = {
  apps: [
    {
      name: 'mars-flip',
      script: './dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
