<script>
export default {
    data() {
        return {
            value: "123"
        }
    },
    directives: {
        myModel: {
            bind(el) {
                console.log(this)
                el.value = this.value;
                el.oninput = () => {
                    this.value = el.value;
                }
            },
            update(el) {
                el.value = this.value
            }
        }
    },
    render(h) {
        return h("input", {
            directives: [//如下就是相当于在input上书写了一个指令  v-myModel:foo.x="value"
                {
                    name: "myModel",
                    value: this.value,
                    expression: 'value',
                    arg: "foo",
                    modifiers: {
                        x: true,
                        y: false
                    }
                }
            ]
        })
    }
}
</script>