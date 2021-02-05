const vm = new Vue({
    el: "#app",
    data: {
        goodsList: [{
                title: '上装',
                typeList: ['全部', '针织衫', '毛呢外套', 'T恤', '羽绒服', '棉衣', '卫衣', '风衣'],
                id: 1,
            },
            {
                title: '裤装',
                typeList: ['全部', '牛仔裤', '小脚/铅笔裤', '休闲裤', '打底裤', '哈伦裤'],
                id: 2,
            },
            {
                title: '裙装',
                typeList: ['全部', '连衣裙', '半身裙', '长袖连衣裙', '中长款连衣裙'],
                id: 3,
            }
        ],
        selectedArr: [{
            row: 1,
            col: 0,
        }, {
            row: 2,
            col: 0,
        }, {
            row: 3,
            col: 0,
        }], //表示表示选中的是第几行被选中的所对应的下标
        selectAll: [

        ],//只显示没有不是全部的且被选中
    },
    methods: {
        select(row, cols) {
            // 1. 将当前元素有类样式.active, 之前被选中的元素去掉类样式.active
            // 就是将selectedArr[row].col跟换成当前cols
            this.$set(this.selectedArr[row], "col", cols);
            
            const notAll = this.selectedArr
                            .filter(item => item.col)
                            .map(item => ({
                                col: item.col,
                                row: item.row,
                                content: this.goodsList[item.row - 1].typeList[item.col],
                            }));//得到不是全部的数组
            this.selectAll.length = 0;//将数组中内容进行清空，此时也不会导致页面进行刷新
            this.selectAll.push(...notAll);
        },
        del(item, index) {
            //当前行回退到全部  更新selectedArr中数据就可以
            this.$set(this.selectedArr[item.row - 1], "col", 0)
            this.selectAll.splice(index, 1);
        }
    }
})