import { Message } from "element-ui";

export default (data) => {
    data.$axios.onError(err => {
        const { statusCode, message } = err.response.data;
        if (statusCode === 400) {
            Message.warning({ message });
        }

        // 如果请求结果是401，一般是token错误或者过期了，如果是403，一般是token没有传值
        if (statusCode === 401 || statusCode === 403) {
            // 跳转到登录页
            data.redirect(200, '/user/login', {
                returnUrl: data.route.fullPath
            })
        }
    })
}