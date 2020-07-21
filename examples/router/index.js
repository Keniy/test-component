import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './auto-import'

Vue.use(VueRouter)

export const constantRouterMap = [
    ...routers
]

const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0}),
    routes: constantRouterMap
})
console.log(router)
router.beforeEach((to, from, next) => {
    next()
})

export default router