export default {
    name: 'sidebarItem',
    props: {
        routes: {
            type: Array,
            default: []
        },
        isNest: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            roles: []
        }
    },
    methods: {
        // 检查角色权限
        /**
         * checkRole
         * @param { Array } role     角色类型总集
         * @param { Array } allRole  页面可访问的角色类型总集
         * @return {Boolean}
         */
        checkPageRole(allRole) {
            if (!allRole) return true
            if (!this.roles || !Array.isArray(this.roles)) return false

            if (!Array.isArray(allRole)) {
                return this.roles.indexOf('' + allRole) > -1
            }

            let acls = 0
            for (let role of allRole) {
                if (this.roles.indexOf(role) > -1) acls++
            }
            return acls > 0
        }
    }
}