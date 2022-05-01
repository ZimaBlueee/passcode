<template>

  <div>
    <QrcodeReader></QrcodeReader>
  </div>
</template>

<script>
import QrcodeReader from "@/components/QrcodeReader";

export default {
  components: {QrcodeReader},
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


</style>
