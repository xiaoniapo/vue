<template>
  <div id="app">
    <!-- <base-cmp1 :num='num'></base-cmp1>
    <base-cmp2 :num="num"></base-cmp2> -->
    <!-- <base-demo :list="list"></base-demo> -->
    <base-demo>
      <!-- <template name="header">
        <span>我是header区域</span>
      </template>
      <template name="default">
        <p>我是默认插槽</p>
      </template>
      <template name="footer">
        <h1>我是底部插槽</h1>
      </template> -->
      <template #name="name">
        <p>{{ name }}</p>
      </template>
    </base-demo>
  </div>
</template>

<script>
// import baseCmp1 from "./components/baseCmp1"
// import baseCmp2 from "./components/baseCmp2"
import baseDemo from "./components/baseCmp7.vue"

export default {
  name: 'App',
  data() {
    return {
      num: 6,
      list: [
        // {name: "chen"},
        // {name: "wang"}
      ]
    }
  },
  components: {
    // baseCmp1,
    // baseCmp2
    baseDemo
  },
  
  
}
</script>

<style>

</style>
