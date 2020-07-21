
/** 
 * 路由配置
 */
import Layout from 'components/layout/index.vue'

let routes = {
    path: '/demo',
    component: Layout,
    redirect: '/demo/searchInput',
    meta: { title: '首页', icon: 'dashboard', noCache: true },
    children: [
        {
            name: 'searchInput',
            path: 'searchInput',
            component: () => import('@/page/searchInput/index.vue'),
            meta: { title: '输入框组件', icon: 'searchInput', noCache: true }
        }
    ]
}

export default [routes]
    