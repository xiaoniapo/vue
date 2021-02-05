axios.interceptors.request.use(config => {
    config.baseURL = 'https://developer.duyiedu.com/vue/bz'
    return config;
});
axios.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data.data;
    }
}, error => {
    if (error.response) {
        console.log("响应错误")
    } else if (error.request) {
        console.log("请求错误")
    }
})
const vm = new Vue({
    el: "#app",
    data: {
        showNavBlock: false, //是否展示nav-block块
        typeWidth: 20, //表示每一个li的宽度
        typeIndex: 0, //表示当前选中的是第几个li
        typeList: [], //所有的播放类型
        bannerList: [],

        listLeft: 0, //记录单行的定位
        barLeft: 4, //记录底部滚动条距离左边的距离 最开始的时候刚好有一个padding的距离

        dotActive: 0,
        bannerLeft: 0,
    },
    created() {
        axios.all([
            axios.get('/nav'),
            axios.get("/banner")
        ]).then(axios.spread((typeList, bannerList) => {
            this.typeList = typeList;
            const ele = {...bannerList[0]}
            ele.id=Math.floor(Math.random() * 100000000)
            this.bannerList = [...bannerList, ele];
            // this.handleTransition()
        }));
    },
    methods: {
        showBlock() {
            this.showNavBlock = true;
        },
        closeBlock() {
            this.showNavBlock = false;
        },
        handleClick(index) {
            const {
                typeWidth,
                typeIndex,
                typeList
            } = this;
            if (index === typeIndex) {
                return;
            }
            const len = typeList.length;
            //有五个前面距离左边的距离就是25
            const MaxLeft = (len - 6) * typeWidth + 25
            //设置滚动条的距离
            this.barLeft += (index - typeIndex) * typeWidth;
            //设置到导航栏的左边距离
            if (typeIndex < index) { //表示向右点
                if (index < 4) {
                    this.listLeft = 0
                } else if (index === 4) {
                    this.listLeft = -25;
                } else if (index > 4 && this.listLeft > -MaxLeft) {
                    this.listLeft -= (index - typeIndex) * typeWidth;
                }
            } else { //向左点
                if (index >= 4 && index < len - 2) {
                    this.listLeft += typeWidth * (typeIndex - index)
                } else if (index === 3 || index === 2) {
                    this.listLeft = -25;
                } else if (index === 1 || index === 0) {
                    this.listLeft = 0
                }
            }
            this.typeIndex = index;
        },
        // 当点击block块时，进行的操作
        handleClicks(index) {
            this.showNavBlock = false;
            this.handleClick(index);
        },
        out() {
            // console.log("我执行了")
            setTimeout(() => {
                this.bannerLeft -= 100;
            }, 1500)
        },
        handleTransition() {
            console.log("过渡结束");
            this.out();
        }
    },
    computed: {
        totalWidth() {
            return this.typeList.length * this.typeWidth + "vw";
        },
        show() {
            if (this.showNavBlock) {
                return "translateY(0)"
            } else {
                return "";
            }
        },
        len() {
            return this.bannerList.length - 1
        }
    }
})