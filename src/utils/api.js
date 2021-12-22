import axios from '../utils/http'
import QS from 'qs'
import base from './base'

/**
 * post方法，对应post请求
 * @desc注册请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function userRejister(data) {
    return axios({
        url: `${base.url}/users/register`,
        method: 'post',
        data: QS.stringify(data)
    })
}

/**
 * get方法，对应get请求
 * @desc登录请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function userInfo() {
    return axios({
        url: `${base.url}/profile/all`,
        method: 'get'
    })
}

// 查询电影链接
export function queryFilms(data) {
    return axios({
        url: `${base.prod.baseUrl}/videoSearch/searchVideoByHotlink?keyWord=` + data,
        method: 'get'
    })
}
