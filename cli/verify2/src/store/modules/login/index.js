import { getSessionStorage, saveObject } from '@/tools/storage'
import { STORE_KEY_USERNAME, STORE_KEY_SESSION, STORE_KEY_TOKEN } from '@/config/userInfo'

const state = {
  id: '',
  username: '',
  session: '',
  // dataPowerList: [],
  // dataPowerListALL: [],
  firstLoginFlag: '',
  token: '' // 登录信息存储token
}

const getters = {
  logined(state) {
    return !(!state.session && (state.session === 'undefined' || state.session !== 0))
  },
  // dataPowerList(state) {
  //   return state.dataPowerList
  // },
  // dataPowerListALL(state) {
  //   return state.dataPowerListALL
  // },
  session(state) {
    return state.session
  },
  username(state) {
    return state.username
  },
  id(state) {
    return state.id
  },
  firstLoginFlag(state) {
    return state.firstLoginFlag
  },
  token(state) {
    return state.token
  }
}

const mutations = {
  // 设置登录信息
  SET_LOGININFO(state, data) {
    if (Object.isObject(data)) {
      data.hasOwnProperty(STORE_KEY_USERNAME) && (state[STORE_KEY_USERNAME] = state[STORE_KEY_USERNAME])
      data.hasOwnProperty(STORE_KEY_SESSION) && (state[STORE_KEY_SESSION] = state[STORE_KEY_SESSION])
      data.hasOwnProperty('firstLoginFlag') && (state.firstLoginFlag = state.firstLoginFlag)
      data.hasOwnProperty('id') && (state.id = state.id)
      data.hasOwnProperty(STORE_KEY_TOKEN) && (state[STORE_KEY_TOKEN] = state[STORE_KEY_TOKEN])
    }
  }
  // 设置权限
  // SET_PRIVILEGE(state, data) {
  //   state.dataPowerListALL = data
  //   state.dataPowerList = []
  //   for (let opt of data) {
  //     if (opt.type === 'SYSTEM') {
  //       if (opt.privilege !== '') {
  //         state.dataPowerList = []
  //         for (let i = 0; i <= opt.privilege.length; i++) {
  //           const list = opt.privilege[i]
  //           state.dataPowerList.push({ value: list })
  //         }
  //       } else {
  //         state.dataPowerList = []
  //       }
  //     }
  //   }
  // }
}

const actions = {
  // 初始化
  inintLogininfo({ commit }) {
    const session = getSessionStorage()
    commit('SET_LOGININFO', session)
  },
  // 保存
  setLogininfo({ commit }, data) {
    saveObject(data)
    commit('SET_LOGININFO', data)
  },
  // 用户登录
  login({ commit, dispatch, getters }, payload) {
    if (getters.logined) {
      return
    }
    // 登录接口
    return new Promise((resolve, reject) => {
      resolve({
        name: 'admin',
        session: 'session',
        token: 'token',
        firstLoginFlag: 'firstLoginFlag',
        id: 'id'
      })
    }).then(data => {
      dispatch('setLogininfo', {
        [STORE_KEY_USERNAME]: data.name,
        [STORE_KEY_SESSION]: data.session,
        [STORE_KEY_TOKEN]: data.token,
        firstLoginFlag: data.firstLoginFlag,
        id: data.id
      })
    })
  },
  // 用户登出
  logout({ dispatch }) {
    new Promise((resolve, reject) => {
      resolve()
    }).then(() => {
      dispatch('inintLogininfo', {
        [STORE_KEY_USERNAME]: '',
        [STORE_KEY_SESSION]: ''
      })
    })
  },
  // 用户心跳
  heartbeat({ dispatch }) {
    return new Promise((resolve, reject) => {
      resolve()
    }).catch(err => {
      dispatch('inintLogininfo', {
        [STORE_KEY_USERNAME]: '',
        [STORE_KEY_SESSION]: ''
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
