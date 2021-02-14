<script>
export default {
  data() {
    return {
      name: "123",
    };
  },
  render(h) {
    return h("div", [
      this.$scopedSlots.name({
        name: this.name,
      }),
    ]);
  },
};
</script>