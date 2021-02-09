<template>
  <div>
    <div>xxxx</div>
    {{ name }}
    <button @click="handleClick">click me</button>
    <p>我是父组件的的p元素</p>

    <my-son></my-son>
  </div>
</template>
<script>
import son from "./son.vue";
export default {
  data() {
    return {
      name: "chen",
    };
  },
  methods: {
    handleClick() {
      console.log(123);
    },
  },
  components: {
    mySon: son,
  },
};
</script>
<style>
p {
    background: red;
}
</style>
