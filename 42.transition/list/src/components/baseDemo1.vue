<template>
  <div>
    <button @click="handleClick">click</button>
    <transition-group>
      <div key="world" v-if="show">hello world</div>
      <div key="chen" v-if="show">hello chen</div>
    </transition-group>
  </div>
</template>

<script>
export default {
    data() {
        return {
            show: true
        }
    },
    methods: {
        handleClick() {
            const { show } = this;
            this.show = !show;
        }
    }
}
</script>

<style scoped>
.v-enter,
.v-leave-to {
    opacity: 0;
}
.v-enter-active,
.v-leave-active {
    transition: all 3s;
}
.v-enter-to,
.v-leave {
    opacity: 1;
}

</style>