const ENVIRONMENTS = {
  development: 'dev',
  production: 'prod'
}

const env = 'NODE_ENV' in process.env ? process.env.NODE_ENV : 'development'
const envConfig = require(`./config.${ENVIRONMENTS[env]}`).default // eslint-disable-line global-require, import/no-dynamic-require

export default envConfig
