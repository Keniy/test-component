/** 
 * 路由配置
 */
import Layout from 'components/layout/index.vue'

let routes = {
    path: '/main',
    component: Layout,
    redirect: '/main/dashboard',
    meta: { title: '首页', icon: 'dashboard', noCache: true },
    children: [
    {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('@/page/dashboard/index.vue'),
        meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
}

export default [routes]