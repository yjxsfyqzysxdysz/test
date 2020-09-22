import { readObject, saveObject, clearMulti } from './storage.js'
import { STORE_KEY_USERNAME, STORE_KEY_SESSION, STORE_KEY_TOKEN } from '@lib/config.js'

export function read() {
  return readObject([STORE_KEY_USERNAME, STORE_KEY_SESSION, STORE_KEY_TOKEN])
}

export function save(user) {
  return saveObject(user, [STORE_KEY_USERNAME, STORE_KEY_SESSION, STORE_KEY_TOKEN])
}

export function clear() {
  return clearMulti([STORE_KEY_USERNAME, STORE_KEY_SESSION, STORE_KEY_TOKEN])
}
