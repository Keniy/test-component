export default {
    name: 'searchInput',
    data() {
        return {
            value: null,
            complexVal: null,
            dialog: {
                visible: false
            }
        }
    },
    inject: ['foo'],
    computed: {
        dropBoxOpts() {
            return {
                width: '450',
                type: 'PROJECT',
                placeholder: '请选择',
                isLoad: true,
                focusData: true,
                params: {
                }
            }
        }
    },
    watch: {
        complexVal: {
            handler(val) {
                console.log('emit value', val)
            },
            deep: true
        }
    },
    created() {
        
    }
}