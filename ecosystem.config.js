module.exports = {
  apps: [
    {
      name: 'web-app',
      script: './build/server.js',
      instances: '2',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
