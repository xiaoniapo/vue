<script>
//模拟v-for和v-for指令
export default {
    props: ['list'],
    render(h) {
        if(this.list.length) {
            return h('div', [h("ul", this.list.map(item => h("li", item.name)))])
        }else {
            return h("p", "我是p元素")
        }
        // <template>
        //     <div>
        //         <ul v-if="list.length">
        //             <li v-for="item in list" :key="item.name">{{ item.name }}</li>
        //         </ul>
        //         <p v-else>我是p元素</p>
        //     </div>
        // </template>
    
    }
}
</script>