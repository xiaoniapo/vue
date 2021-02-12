<script>
export default {
  props: {
    num: Number,
  },
  data() {
    return {
      b: true,
    };
  },
  render(createElement) {
    //如下是等同的
    const vnode = createElement("h" + this.num, `标题${ this.num }`);
    console.log(vnode)
    return vnode
    // <template>
    //     <h1 v-if="num === 1">标题</h1>
    //     <h2 v-else-if="num === 2">标题</h2>
    //     <h3 v-else-if="num === 3">标题</h3>
    //     <h4 v-else-if="num === 4">标题</h4>
    //     <h5 v-else-if="num === 5">标题</h5>
    //     <h6 v-else>标题</h6>
    // </template>
  },
};
</script>

<style scoped>
</style>