export default {
    data() {
        return {
            popId: null,
            popoverWidth: 350,
            tableData: [],
            searchUrl: null,
            currentPage: 1,
            total: 0,
            totalPages: 0,
            pageSize: 5,
            pageSizes: [5, 10],
            visible: false,
            tagVisable: false,
            codeOrName: null,
            placeholder: null,
            originCodeOrName: null,
            loading: true,
            loadingText: '加载中',
            multipleSelection: [],
            multipleText: '',
            selectList: [],
            hasLoaded: false,
            showCode: false,
            focus: false,
            cacheList: null,
            backCount: 0,
            list: null,
            searchName: null,
            columnList: []
        }
    }
}