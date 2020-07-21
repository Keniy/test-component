export default {
    props: {
        value: {
            required: true
        },
        popoverPosition: {
            type: String,
            default: 'bottom-start'
        },
        data: {
            type: Object,
            default: null
        },
        multiple: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'normal'
        },
        beforeEnter: {
            type: Function
        },
        showAddBtn: {
            type: Boolean,
            default: false
        },
        addBtnText: {
            type: String,
            default: '新增'
        },
        addHandler: {
            type: Function
        },
        rowItem: {
            type: Object,
            default: () => {}
        }
    }
}