export default {
  APP_NAME: 'Service',
  APP_PORT: 5000,
  APP_PLUGIN: {
    POSTGRE: {
      host: 'localhost',
      port: 5432,
      user: 'pgsql',
      password: null,
      database: 'postgres' // 库名
    },
    REDIS: {
      host: '127.0.0.1',
      port: 6379,
      prefix: '' // REDIS KEY 前缀;
    }
  }
}
