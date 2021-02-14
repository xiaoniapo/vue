<script>
export default {//插槽
    render(h) {
        console.log(this.$slots)
        return h("div", this.$slots.default);
        
    }
}
</script>