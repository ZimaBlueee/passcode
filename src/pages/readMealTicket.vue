<template>
  <div>
    <el-radio v-model="pack" label="false" border>堂食</el-radio>
    <el-radio v-model="pack" label="true" border>打包</el-radio>
    <QrcodeReader :pack="pack"></QrcodeReader>
  </div>
</template>

<script>
import QrcodeReader from "@/components/QrcodeReader";

export default {
  components: {QrcodeReader},
  data() {
    return {
      pack: 'false',
    }
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
