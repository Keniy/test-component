import SidebarItem from '../sidebarItem/sidebarItem'
export default {
    name: 'sidebar',
    components: {
        SidebarItem
    },
    props: {
        defaultRouteName: {
            type: String
        },
        backgroundColor: {
            type: String,
            default: '#fff'
        },
        activeTextColor: {
            type: String,
            default: '#FFCED2'
        }
    },
    data() {
        return {
            sidebar: {
                opened: false
            }
        }
    },
    created() {
        console.log('routes', this.routes)
    },
    computed: {
        routes() {
            const routes = this.$router.options.routes.filter((item) => {
                return item.name === this.defaultRouteName
            })
            // 按sort排序
            routes.sort((a, b) => a.sort - b.sort)
            return routes
        }
    },
    methods: {

    }
}   