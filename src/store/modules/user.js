import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

let token = getToken() ? decodeURIComponent(getToken()) : '';
let role = token ? token.split(';')[2] : 'visitor';
const user = {
    state: {
        token: token,
        name: '',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        role: role  //默认为游客
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        },
        SET_ROLE: (state, role) => {
            state.role = role
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                // login(username, userInfo.password).then(response => {
                    // const data = response.data
                    // setToken(data.token)
                    // commit('SET_TOKEN', data.token)
                //     resolve()
                // }).catch(error => {
                //     reject(error)
                // })

                if (username === '123' && userInfo.password === 'abc123'){

                    let token = encodeURIComponent(username + ';' + userInfo.password + ';' + 'superAdmin');
                    setToken(token)
                    commit('SET_TOKEN', token)
                    commit('SET_ROLE', 'superAdmin')
                    resolve()
                } else {
                    reject()
                }
            })
        },

        // 获取用户信息
        // GetInfo({ commit,state }) {
        //     return new Promise((resolve, reject) => {
        //         getInfo(state.token).then(response => {
        //             const data = response.data
        //             if (data.role && data.role.length > 0) { // 验证返回的role是否是一个非空数组
        //                 commit('SET_ROLE', data.role)
        //             } else {
        //                 reject('getInfo: must be a non-null array !')
        //             }
        //             commit('SET_NAME', data.name)
        //             commit('SET_AVATAR', data.avatar)
        //             resolve(response)
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },

        // 登出
        LogOut({ commit,state }) {
            return new Promise((resolve, reject) => {
                // logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    // commit('SET_ROLE', [])
                    removeToken()
                    resolve()
                // }).catch(error => {
                //     reject(error)
                // })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user