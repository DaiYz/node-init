import Router from 'koa-router'
import Servlet from './servlet'

// 第一种; 链式语法路由
export default new Router()
  // .prefix('/api') // 可以加前缀,之后的API全部需要 /api/xxx 访问
  // 看servlet里说明
  .get('/abc', Servlet.abc)

  .get('/all', Servlet.all)

  .get('/header', Servlet.header)

// 第二种; 标准
// var router = new Router()
// router.get('/abc', Servlet.abc)

// router.all('/all', Servlet.all)
