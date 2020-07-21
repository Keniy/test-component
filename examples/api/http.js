/*
    author：peter (185832959@qq.com)
    date：2018-07-04
*/
import axios from 'axios'
// import { Message as $msgBox } from 'element-ui'


// build http header
function buildHeader(option) {

    return { ...option }
}

function handleError(err = {}) {
    let errorCode = err.errorCode
    // 如果是手动取消的请求，不显示错误信息
    if (axios.isCancel(errorCode)) {
        console.log(errorCode)
    } else {
        let msg = err.message || '发生未知错误，请重试'
        if (('' + errorCode).indexOf('timeout') > -1) {
            msg = '加载超时！请检查你的网络'
        }
        // $msgBox({
        //     type: 'error',
        //     message: msg
        // })
    }
}

function processData(apiData = {}) {
    let request = {
        ...apiData
    }
    return request
}

function transformResponse(_data) {
    let data
    try {
        data = JSON.parse(_data)
    }
    catch (e) {
        return _data
    }
    if (data) {
        // 200表示接口请求成功
        if (data.code === '200') {
            let res = data.responseBody
            if (res.code > 0) {
                return res.data
            }
            else {
                handleError(res)
                // errorHandle(res)
                // let msg = res.message || '发生未知错误，请重试'
                throw new Error(JSON.stringify(res))
            }
        } else {
            handleError(data)
            let msg = data.message || '发生未知错误，请重试'
            throw new Error(msg)
        }
    } else {
        let msg = 'Unknow Error'
        throw new Error(msg)
    }
}

// axios配置
let axiosConfig = (option = {}) => {
    return {
        // baseURL: host,
        headers: buildHeader(option),
        timeout: 10000,
        // responseType: 'json',
        // transformRequest: [function (data) {
        //     if (data instanceof FormData) {
        //         return data
        //     } else {
        //         let contType = option['Content-Type']
        //         if (contType && contType.indexOf('application/json') > -1) {
        //             return JSON.stringify(data)
        //         } else {
        //             return data
        //         }
        //     }
        // }],
        transformResponse: [function (data) {
            return transformResponse(data)
        }]
    }
}

// http get method
export function get(url, data) {
    let nax = axios.create(axiosConfig())
    return nax.get(`${url}`, {
        params: processData(data)
    }).then((res) => {
        return res.data
    }).catch((err) => {
        throw err
    })
}

// http post method
export function post(url, data) {
    let nax = axios.create(axiosConfig({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }))
    return nax.post(`${url}`, processData(data)).then((res) => {
        return res.data
    }).catch((err) => {
        throw err
    })
}