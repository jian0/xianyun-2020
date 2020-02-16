export const state = () => {
    return {
        // 历史数据
        history: [],
        // 订单信息
        orderDetail: {
            seat_infos: {}
        },
        // 总金额
        allPrice: 0
    }
}

export const mutations = {
    // 修改历史数据
    setHistory(state, data) {
        state.history.unshift(data)
        state.history.length = 5
    },
    // 修改订单信息
    setOrderDetail(state, data) {
        state.orderDetail = data
    },
    // 修改总金额
    setAllPrice(state, data) {
        state.allPrice = data
    }
}