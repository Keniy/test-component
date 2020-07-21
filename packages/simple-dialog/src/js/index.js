export default {
    name: 'simpleDialog',
    props: {
        value: {
            required: true,
            type: Boolean
        }
    },
    data() {
        return {
            dialog: {
                visible: false,
                title: 'Simple Dialog'
            },
            ruleForm: {
                value: null
            }
        }
    },
    watch: {
        'value': {
            handler(val) {
                this.dialog.visible = val       
            }
        }
    },
    created() {

    },
    methods: {
        close() {
            this.$emit('input', false)
        },
        submit() {
            this.close()
        }
    }
}