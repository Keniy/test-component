import SimpleDialog from './src/index'

SimpleDialog.install = function(Vue) {
    Vue.component(SimpleDialog.name, SimpleDialog)
}

export default SimpleDialog