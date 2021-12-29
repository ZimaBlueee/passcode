<template>
  <div class="calculator center">
        <img src="../../static/img/hashiqi.gif" alt="" width="20%" style="min-width:200px" >
        <div>
          输入你的身高：
          <el-input style="width: 1rem;" placeholder="请输入" v-model="input" maxlength="3" show-word-limit></el-input>
          CM
        </div>

        <el-button type="success" plain @click="result">开始计算</el-button>

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


</style>
