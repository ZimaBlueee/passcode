<template>
  <div>
    <Visitor></Visitor>
  </div>
</template>

<script>
import Visitor from "../components/Visitor";

export default {
  components: {Visitor},
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
