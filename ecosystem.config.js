
const package = require('./package.json');

module.exports = {
  apps : [{
    name: package.name,
    script: 'npm',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: '-- run dev',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    log_date_format:'YYYY-MM-DD HH:mm Z',
    error_file:'./.pm2/logs/err.log',
    out_file:'./.pm2/logs/out.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
