import { isEmptyArray, isEmpty, copy } from 'common/utils'
export default {
    methods: {
        isEmptyArray,
        copy,
        isEmpty
    },
    watch: {
        value: {
            handler(val) {
                if (!this.isEmpty(val)) {
                    if (!this.multiple) {
                        this.selectList.length = 0
                    }
                    if (typeof val === 'string') {
                        this.selectList.push({
                            label2: val
                        })
                        this.searchName = val
                    } 
                    else {
                        this.selectList.push(val)
                        this.searchName = val.label2
                    }
                    this.placeholder = null
                } else {
                    this.selectList.length = 0
                    this.codeOrName = null
                    this.searchName = null
                    if (this.data.placeholder) {
                        this.placeholder = this.data.placeholder
                    }
                }
                this.$emit('validPass')
            },
            deep: true
        },
        data: {
            handler(obj) {
                if (obj.width) this.popoverWidth = obj.width
                if (this.isEmpty(this.value)) {
                    if (obj.placeholder) this.placeholder = obj.placeholder
                } else {
                    this.placeholder = null
                }
            },
            deep: true
        },
        codeOrName: {
            deep: true,
            handler(val) {
                if (!this.hasLoaded) {
                    this.search()
                    this.hasLoaded = true
                }
                this.searchName = val
            }
        },
        // selectList: {
        //     handler(list) {
        //         if (!this.isEmptyArray(list)) {
        //             if (list.length > 1) {
        //                 this.multipleText = '选中' + list.length + '个'
        //             }
        //             this.placeholder = null

        //             this.$emit('input', list)
        //         } else {
        //             this.multipleText = ''
        //         }
        //     },
        //     deep: true
        // },
        multipleSelection: {
            handler(list) {
                if (list) {
                    if (this.multiple) {
                        this.selectList = this.copy(list)
                    }
                }
            },
            deep: true
        }
    }
}