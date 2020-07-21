import SideBar from '../sidebar/src/index'

export default {
    name: 'layout',
    components: {
        SideBar
    },
    created() {
        console.log('init layout')
    }
}