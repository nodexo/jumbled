
'use strict'

const SEP = ':'

/**
 * RedisHelpers static class.
 * @class
 */
class RedisHelpers {

  static parseInfo (str, options = {}) {
    let namespace = null
    const info = {}
    const lines = str.split(/\r?\n/g)
    for (const line of lines) {
      if (line) {
        if (line.startsWith('#')) {
          const key = line.slice(1).trim().toLowerCase()
          if (options['OmitNamespacing'] !== true) {
            info[key] = {}
            namespace = key
          }
        } else {
          const [key, ...rest] = line.split(SEP)
          const value = rest.join(SEP)
          namespace ? info[namespace][key] = value : info[key] = value
        }
      }
    }
    return info
  }
}

module.exports = RedisHelpers
