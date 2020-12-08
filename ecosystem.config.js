
const package = require('./package.json');

module.exports = {
  apps : [{
    name: package.name,
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '500M',
    log_date_format:'YYYY-MM-DD HH:mm Z',
    error_file:'./.pm2/logs/err.log',
    out_file:'./.pm2/logs/out.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }],
};
