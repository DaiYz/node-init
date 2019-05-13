import Client from 'redis'
import bluebird from 'bluebird'
import CG from '../config'

bluebird.promisifyAll(Client.RedisClient.prototype)
bluebird.promisifyAll(Client.Multi.prototype)

class Redis {
  constructor (options) {
    this.client = Client.createClient(options)
    // this.multi = this.client.multi() // 多指令队列
  }

  async getValue (key) {
    let value = await this.client.getAsync(key)
    try {
      value = JSON.parse(value)
    } catch (e) { /**/ }
    return value
  }

  // setValue('a', {}, ['EX', 10]) // 则代表a十秒后过期
  async setValue (key, value, opts = []) {
    const _value = typeof (value) === 'object' ? JSON.stringify(value) : value
    return new Promise(resolve => this.client.set(key, _value, ...opts, resolve))
  }

  async delValue (key) {
    return new Promise(resolve => this.client.del(key, resolve))
  }

  // 原子Key;自带访问锁;线程安全;用于做计数器;ID自增等 例: (await atomic('a')) 调用一次返回的值自增1
  async atomic (key) {
    return new Promise((resolve, reject) => this.client.incr(key, (err, value) => {
      if (err) {
        return reject(err)
      }
      resolve(value)
    }))
  }

  // async setGeoMap (mapKey, mapId, coords) {
  //   return new Promise(resolve => this.client.geoadd(mapKey, coords.longitude, coords.latitude, mapId, resolve))
  // }

  // async delGeoMap (mapKey, mapId) {
  //   return new Promise(resolve => this.client.zrem(mapKey, mapId, resolve))
  // }
}

const redis = new Redis(CG.APP_PLUGIN.REDIS)
export default redis
