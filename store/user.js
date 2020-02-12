export const state = () => ({
    userInfo: {
        token: '',
        user: {}
    }
})

export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data
    }
}

export const actions = {
    login({ commit }, data) {
        return this.$axios({
            url: '/accounts/login',
            method: 'POST',
            data: data
        }).then(res => {
            // console.log(res);
            const data = res.data
            commit('setUserInfo', data)
            return data;
        })

    }
}