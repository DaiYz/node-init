module.exports = {
  apps: [{
    name: '待修改',
    script: 'src/app.js',
    // output: '/data/logs/service_chat_out.log',
    // error: '/data/logs/service_chat_err.log',
    exec_mode: 'fork',
    instances: 1,
    min_uptime: '5s',
    restart_delay: 3000,
    interpreter: './node_modules/.bin/babel-node',
    watch: '.',
    ignore_watch: [ '*.log', 'node_modules' ],
    env: { NODE_ENV: 'production' }
  }]
}
