import { Pool } from 'pg'
import CG from '../config'

class Sql {
  constructor (conn) {
    this.pool = new Pool(conn)
    this.pool.on('error', (err) => {
      console.error('[数据库连接失败]', err)
      process.exit(-1)
    })
  }

  /**
   * 执行一个查询
   * @param query
   * @param values
   * @returns {Promise<*>}
   */
  async query (sql, parameter = null) {
    const _client = await this.pool.connect()
    const _query = await _client.query(sql, parameter)
    await _client.release()
    return _query
  }

  /**
   * 结束连接
   * @returns {Promise<void>}
   */
  async end () {
    await this.pool.end()
  }

  /**
   * 事务块
   */
  async transactions (transaction = async (client) => {}) {
    const _client = await this.pool.connect()
    try {
      await _client.query('BEGIN')
      await transaction(_client)
      await _client.query('COMMIT')
    } catch (e) {
      await _client.query('ROLLBACK')
      throw e
    } finally {
      _client.release()
    }
  }
}

const sql = new Sql(CG.APP_PLUGIN.POSTGRE)

export default sql
