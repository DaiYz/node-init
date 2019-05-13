import Koa from 'koa'
import Body from 'koa-body'
import Logger from 'koa-logger'
import CG from './config'
import router from './routes'

const app = new Koa()

app
  .use(Logger()) // 日志
  .use(Body()) // FormBody 转换

  .use(router.routes()) // 注册路由
  .use(router.allowedMethods()) // 注册允许的请求方法 or 可忽略

  .listen(CG.APP_PORT) // 监听的端口;

console.log(`[${CG.APP_NAME}][http://localhost:${CG.APP_PORT}]`)
