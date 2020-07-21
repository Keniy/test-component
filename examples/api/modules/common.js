import { get } from '../http'

export default {
    
    /**
     * 列表查询
     *
     * @param {*} params
     * @returns
     */
    fetchList(params) {
        return get('https://www.easy-mock.com/mock/5d317df167da28463d961d70/common/list', params)
    }
}