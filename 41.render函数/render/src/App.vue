<template>
  <div id="app">
    <base-cmp1 :num='num'></base-cmp1>
    <base-cmp2 :num="num"></base-cmp2>
  </div>
</template>

<script>
import baseCmp1 from "./components/baseCmp1"
import baseCmp2 from "./components/baseCmp2"

export default {
  name: 'App',
  data() {
    return {
      num: 6
    }
  },
  components: {
    baseCmp1,
    baseCmp2
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
