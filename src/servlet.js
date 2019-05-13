import moment from 'moment'
import { _ } from '.'

const servlet = {}

// http://localhost:5000/abc
servlet.abc = async (ctx, next) => {
  ctx.body = {
    abc: true
  }
}

// http://localhost:5000/all
// ctx是上下文,里面包括了很多方法,next一般不用调,所以不用显式声明
servlet.all = async (ctx) => {
  const { rows: select } = await _.sql.query('select count(*) from video_library where id > 0 limit 10 offset 0')
  const count = select[0]['count']
  ctx.body = {
    success: true,
    data: parseInt(count)
  }
}

// http://localhost:5000/header
// 第三种,拆出来获取request的请求参数
servlet.header = async ({ request, response }) => {
  response.body = request.header
}

export default servlet
