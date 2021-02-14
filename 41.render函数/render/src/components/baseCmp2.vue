<script>
//深入了解数据对象
// import baseCmp1 from "./baseCmp1";
import baseCmp3 from "./baseCmp3"
export default {
    props: {
        num: Number
    },
    data() {
        return {
            flag: true,
            name: "names"
        }
    },
    render(h) {
        // return h(baseCmp1, {
        //     props: {
        //         num: this.num
        //     },
        //     class: ["foo", { red: this.flag }]
        // })
        return h("div", {
            class: ["foo", { red: this.flag }],
            style: {
                fontSize: "18px",
                color: "red"
            },
            attrs: {
                id: this.name
            },
            // domProps: {
            //     innerHTML: "baz"
            // },
            on: {
                click(e) {
                    console.log(e)
                },
                mouseenter() {
                    console.log("我悬浮了")
                }
            }
            
        }, ["我是render函数渲染的标签", h(baseCmp3, {
           on: {//此时当文本框聚焦的时候是不会触发函数的
               focus() {
                   console.log("on 我聚焦了");
               },
               blur() {
                   console.log("on 我失焦了")
               }
           },
           nativeOn: {
               focus() {
                   console.log("nativeOn 我聚焦了");
               },
               blur() {
                   console.log("nativeOn 我失焦了")
               }
           },
        })])
    }
}
</script>