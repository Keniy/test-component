import Clickoutside from 'element-ui/src/utils/clickoutside'
import SearchPage from 'packages/search-page/index'
import Api from 'api/index'
import Loading from 'packages/loading/index'
import props from './props'
import model from './model'
import watch from './watch'
import { arrayAttrToIndex, arrayAttrToObj, isEmptyArray, isEmpty, copy } from 'common/utils'

export default {
    name: 'QueryDropBox',
    mixins: [props, model, watch],
    components: {
        SearchPage,
        Loading
    },
    directives: {
        Clickoutside
    },
    computed: {
        hasChilds() {
            return this.selectList.length >= 2
        },
        currentTagWidth() {
            return this.$refs.inputLayout !== undefined ? this.$refs.inputLayout.offsetWidth || 100 : 200
        }
    },
    created() {
        if (this.value) {
            this.selectList = []
            this.selectList.push({ label2: this.value.label2 })
            this.searchName = this.value.label2
        } else {
            if (this.data) {
                if (this.data.placeholder) {
                    this.placeholder = this.data.placeholder
                }
                if (this.data.width) {
                    this.popoverWidth = this.data.width
                }
            }
            this.searchName = null
        }
    },
    mounted() {
        if (this.$parent.$el.getBoundingClientRect().height > 400) {
            this.popoverPosition = 'bottom-start'
        }
        this.$nextTick(() => {
            document.addEventListener('click', this.$refs['queryDropBox'].handleDocumentClick)
        })
    },
    destroyed() {
        this.codeOrName = null
        this.searchName = null
    },
    methods: {
        isEmpty,
        isEmptyArray,
        copy,
        arrayAttrToIndex,
        arrayAttrToObj,
        compositioninput(event) {
            if (!this.isLock) {
                if (typeof event == 'string' || event === null) {
                    this.searchName = event
                    this.search(1, true)
                }
            }
        },
        autoSearch() {
            this.visible = true
            // setTimeout(() => {
                
            // }, 200)
            this.$nextTick(() => {
                if (!this.hasLoaded || this.data.isLoad) {
                    this.search()
                    this.hasLoaded = true
                }
                if (typeof this.beforeEnter === 'function') {
                    this.search()
                    this.hasLoaded = true
                }
            })
        },
        handleKeydown(event) {
            if (event.key == 'Backspace') {
                if (this.isEmptyArray(this.selectList) && this.focus) {
                    if (!this.codeOrName && this.backCount == 0) {
                        this.backCount = -1
                    } else {
                        this.backCount = this.codeOrName ? this.codeOrName.length : 0
                    }
                    if (this.backCount <= 0) {
                        this.selectList = []
                        this.codeOrName = null
                        this.data.codeOrName = null
                        this.$refs['queryDropTable'].clearSelection()
                        this.multipleText = ''

                        this.handleEmit(this.selectList)
                        this.backCount = 0

                        this.search(1)
                    }
                }
                else {
                    this.codeOrName = null
                    this.data.codeOrName = null
                    this.selectList = []
                    this.handleEmit(this.selectList)
                }
            }
        },
        handleRowClick(row, event, column) {
            if (!this.multiple) {
                // this.codeOrName = row.name
                this.selectList.length = 0
                this.selectList.push(row)

                this.placeholder = null
                this.codeOrName = null
                this.$refs['queryDropBox'].showPopper = false

                this.handleEmit(this.selectList)
            } else {
                this.$refs['queryDropTable'].toggleRowSelection(row)
                let index = this.arrayAttrToIndex(this.selectList, 'label2', row.label2)
                if (index == -1) {
                    this.selectList.push(row)
                } else {
                    this.selectList.splice(index, 1)
                }
                
                this.handleEmit(this.selectList)
                this.codeOrName = null
            }
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.search()
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        handleShowTags() {
            this.tagVisable = true
        },
        handleClose(evt, tag, index) {
            let obj = this.arrayAttrToObj(this.selectList, 'label2', tag.label2)
            if (!this.isEmpty(obj)) {
                this.selectList.splice(index, 1)

                if (this.tableData && this.multiple) {
                    let row = this.arrayAttrToObj(this.tableData, 'label2', tag.label2)
                    this.$refs['queryDropTable'].toggleRowSelection(row)
                }
            }

            this.handleEmit(this.selectList)
            if (this.selectList.length == 0) {
                this.multipleText = ''
                this.codeOrName = null
                this.searchName = null
                // this.value = null
                this.search(1)
            }
        },
        handleBulr(evt) {
            this.focus = false
        },
        handleFocus(evt) {
            this.focus = true
        },
        onRefresh() {
            this.search()
        },
        handleEmit(result) {
            if (this.multiple) {
                this.$emit('input', result)
            } else {
                this.$emit('input', result[0])
            }
        },
        search(val, reload) {
            if (typeof val == 'object' || !val) {
                val = this.currentPage || 1
            }
            if (typeof this.beforeEnter === 'function' && !this.beforeEnter()) {
                this.loading = false
                this.loadingText = '查询条件不足'
                this.tableData = []
                return
            }
            let params = {
                queryType: this.data.type,
                pageNum: val,
                pageSize: this.pageSize
            }
            params.str = this.searchName
            if (this.data.params) {
                for (let key in this.data.params) {
                    params[key] = this.data.params[key]
                }
            }
            this.originCodeOrName = this.codeOrName

            Api.commonApi.fetchList(params).then((data) => {
                if (!data) { 
                    this.tableData = []
                    this.total = 0
                    this.totalPages = 0
                } else {
                    let { list, total } = data
                    if (this.isEmptyArray(list)) {
                        this.tableData = []
                        this.total = 0
                        this.totalPages = 0
                        return
                    }
                    let _list = list && list[0] || []
                    this.currentPage = val
                    this.tableData = _list.list
                    this.total = total
                    this.list = _list
                    let selectList = this.copy(this.selectList)
                    let dataList = _list.list

                    
                    // 重新组合el-table-column 可用数组
                    if (_list && this.columnList.length === 0) {
                        for(let key in _list) {
                            let keyVal = _list[key]
                            if (typeof keyVal === 'string' && !this.isEmpty(keyVal)) {
                                let obj = {
                                    label: keyVal,
                                    property: key.substring(0, key.indexOf('T')) 
                                }
                                this.columnList.push(obj)
                            }
                        }
                        this.columnList.shift()
                    }

                    if (!this.isEmptyArray(selectList)) {
                        // setTimeout(() => {
                            
                        // }, 200)
                        this.$nextTick(() =>{
                            if (!this.isEmptyArray(dataList)) {
                                selectList.forEach(item => {
                                    dataList.forEach(sub => {
                                        if (item.label2 === sub.label2) {
                                            this.$refs['queryDropTable'].toggleRowSelection(sub)
                                        }
                                    })
                                })
                            }
                        })
                        this.multipleText = '选中' + this.selectList.length + '个'
                    }
                }
                this.loading = false
                this.$nextTick(() => {
                    this.$refs['queryDropBox'] && this.$refs['queryDropBox'].updatePopper()
                })
            })
        },
        handleAdd() {
            this.addHandler(this.rowItem)
        }
    }
}