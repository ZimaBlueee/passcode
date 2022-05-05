<template>
  <div class="calculator center">
    <img src="../../static/img/hashiqi.gif" alt="" width="20%" style="min-width:200px">
    <div>
      输入你的身高：
      <el-input style="width: 1.8rem;" placeholder="请输入" v-model="input" maxlength="3"></el-input>
      CM
    </div>

    <el-button type="success" plain @click="result">开始计算</el-button>

    <div class="main">
      <div class="nes-container with-title">
        <span class="title">DEMO</span>
        <span class="nes-text">Good morning. Thou hast had a good night's sleep, I hope.我</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },
    result() {
      if (this.input === '') {
        this.$alert('请先输入您的身高', '计算失败');
      } else {
        this.$alert('您的身高为：' + this.input + 'CM', '身高计算器');
      }
    }
  },
  mounted() {
  }

}
</script>

<style lang="scss">

.calculator {
  font-size: .3rem;

  //margin: 100px 0px 400px;
}

.nes-text {
  font-family: 'pix font';
}


</style>
