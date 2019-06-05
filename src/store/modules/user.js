import { login,getUserPermissions,logout} from '@/api/user'
import { getToken, setToken, removeToken ,setName,getName} from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: getName(),
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { loginName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: loginName.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.data.AppSSOSessionID)
        commit('SET_NAME', data.data.user.name)
        setToken(data.data.AppSSOSessionID)
        setName(data.data.user.name)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },


  getUserPermissions({commit},token){
    return new Promise((resolve,reject) => {
      getUserPermissions({token:token}).then(res => {
      resolve(res.data)
      }).catch(err => {
        reject(error)
      })
    })
  },

  setRoles({commit},role){
    return new Promise((resolve,reject) => {
      commit('SET_ROLES',role)
      resolve()
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then((res) => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
