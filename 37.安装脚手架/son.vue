<template>
  <div>
    <p>我是子组件的p元素</p>
    {{ name }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "son",
    };
  },
};
</script>

<style scoped>
p {
    background: rgb(136, 255, 0);
}
</style>