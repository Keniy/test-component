import prop from './prop'

export default {
    name: 'simpleInput',
    mixins: [prop],
    data() {
        return {
            codeOrName: null
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(val) {
                this.codeOrName = val
            }
        }
    }
}