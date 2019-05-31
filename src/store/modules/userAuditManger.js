// import { login,getUserPermissions,logout} from '@/api/user'
import {Approval} from '@/api/userAuditManger'
import { getToken, setToken, removeToken ,setName,getName} from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },

}

const actions = {
  userApproval({commit},data){
    return new Promise((resolve, reject) => {
      Approval(data).then(res => {
        
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
