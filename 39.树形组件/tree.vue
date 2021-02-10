<template>
    <ul class="list">
        <li
            v-for="(title, index) in dataList"
            :key="title.label"
            :class="['iconfont', {'icon-right': title[defaultProps.children]}, {'icon-down': showChildren[index] && title[defaultProps.children]}]"
        >
        <span @click.prevent="showList(index)">{{ title[defaultProps.label] }}</span>
        <keep-alive>
            <!-- 保存有组件的状态 -->
            <my-tree :dataList="title.children" v-if='showChildren[index] && title.children'></my-tree>
        </keep-alive>
        </li> 
    </ul>
</template>

<script>
export default {
    name: "my-tree",
    props: {
        dataList: Array,
        defaultProps: {
            type: Object,
            default() {//就是保存在返回的数据中key
                return {
                    label: 'label',
                    children: 'children'
                }
            }
        }
    },
    data() {
        return {
            showChildren: []
        }
    },
    methods: {
        showList(index) {
            const res = this.showChildren[index];
            // this.showChildren.splice(index, 1, !res)  因为初始时，数组的长度为零
            this.$set(this.showChildren, index, !res);
        },
        
    },
}
</script>

<style>
@import "./myfont/font.css";
body {
    margin: 0;
}
.list{
    list-style: none !important;
}

</style>