import crypto from 'crypto'

const utilsPackage = {
  crypto: {
    sha1: function (str) {
      var sum = crypto.createHash('sha1')
      sum.update(str, 'utf8')
      return sum.digest('hex')
    },

    sha2: function (str) {
      var sum = crypto.createHash('sha256')
      sum.update(str, 'utf8')
      return sum.digest('hex')
    },

    md5: function (str) {
      var sum = crypto.createHash('md5')
      sum.update(str, 'utf8')
      return sum.digest('hex')
    }
  },
  strings: {

  },
  rules: {

  }
}
export default utilsPackage
