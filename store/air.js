export const state = () => {
    return {
        history: [],
        orderDetail:{
            seat_infos:{}
        },
        allPrice:0
    }
}

export const mutations = {
    setHistory(state, data) {
        state.history.unshift(data)
        state.history.length = 5
    },
    setOrderDetail(state,data){
        state.orderDetail = data
    },
    setAllPrice(state,data){
        state.allPrice = data
    }
}