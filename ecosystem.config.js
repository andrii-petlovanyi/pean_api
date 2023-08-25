module.exports = {
  apps: [
    {
      name: 'pean.api',
      script: 'npm',
      args: 'run start:prod',
      kill_timeout: 4000,
      wait_ready: true,
      autorestart: true,
      watch: ['src'],
      ignore_watch: ['node_modules'],
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
