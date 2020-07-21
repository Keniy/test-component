/**
 * @author wuchao@cloudolp.com
 * 通用加载框， 全局注入
 */
import Loading from './src/loading.vue';

Loading.install = function(Vue) {
    Vue.component(Loading.name. Loading);
};

export default Loading;