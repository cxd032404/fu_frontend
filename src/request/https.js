/**
 * Created by varus
 */
import Axios from 'axios'
import qs from 'qs'

// 通过axios.defaults.timeout设置默认的请求超时时间。例如超过了60s，就会告知用户当前请求超时，请刷新等。
let axios = Axios.create({
	// baseURL: process.env.API_ROOT,
	timeout: 60000,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});


// 请求拦截器
axios.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	}
)
// 响应拦截
axios.interceptors.response.use(response => {
	return response;
},
	(error) => {
		console.warn("request error: ", error)
		let message = ''
		if (error.response && error.response.status >= 500 && error.response.status < 599) {
			message = "服务器异常"
		} else {
			if (error.message == 'Network Error') {
				message = "网络连接超时"
				alert(message)
			} else {
				//message = error.message == 'Network Error' ? '网络异常' : error.message
			}
		}
		return Promise.reject(message)
	}
);

export default axios;
