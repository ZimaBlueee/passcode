<template>

  <div>
    <h1>测试</h1>
    <!--<qrcode/>-->
    <!--<qrcode></qrcode>-->
    <HelloWorld/>
    <HelloWorld></HelloWorld>
  </div>
</template>


<script>
import HelloWorld from '@/components/HelloWorld.vue';
// 注册
components: {
  HelloWorld
}

export default {
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
