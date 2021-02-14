<script>
export default {//实现双向数据绑定
    data() {
        return {
            val: '123'
        }
    },
    render(h) {
        const self = this;
        return h("div", [h("input", {
            attrs: {
                value: this.val,
            },
            on: {
                input(e) {
                    self.val = e.target.value;
                }
            }
        }), h("span", self.val)])
    }
}
</script>