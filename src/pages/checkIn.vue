<template>
  <div>
    <Check></Check>
  </div>
</template>

<script>
import Check from "../components/Check";

export default {
  components: {Check},
  data() {
    return {}
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },
  },
  mounted() {
  }

}
</script>

<style lang="scss">
.el-radio {
  text-align: center;
  margin-bottom: 0.6rem;
}


</style>
