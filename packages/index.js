import QueryDropBox from './query-drop-box/index.js'
import SideBar from './sidebar/index.js'
import SimpleInput from './simple-input/index.js'
import SimpleDialog from './simple-dialog/index.js'

const components = [
    QueryDropBox,
    SideBar,
    SimpleInput,
    SimpleDialog
]

const install = function(Vue) {
    if (install.installed) return
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.vue) {
    install(window.Vue)
}

export default {
    install,
    QueryDropBox,
    SideBar,
    SimpleInput,
    SimpleDialog
}