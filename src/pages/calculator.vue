<template>
  <div class="calculator center">
        <img src="../../static/img/hashiqi.gif" alt="" width="20%" style="min-width:200px" >
        <div>
          输入你的身高：
          <el-input style="width: 1.8rem;" placeholder="请输入" v-model="input" maxlength="3"></el-input>
          CM
        </div>

        <el-button type="success" plain @click="result">开始计算</el-button>

    <div class="frame">
      <button class="custom-btn btn-1">Read More</button>
      <button class="custom-btn btn-2">Read More</button>
      <button class="custom-btn btn-3"><span>Read More</span></button>
      <button class="custom-btn btn-4"><span>Read More</span></button>
      <button class="custom-btn btn-5"><span>Read More</span></button>
      <button class="custom-btn btn-6"><span>Read More</span></button>
      <button class="custom-btn btn-7"><span>Read More</span></button>
      <button class="custom-btn btn-8"><span>Read More</span></button>
      <button class="custom-btn btn-9">Read More</button>
      <button class="custom-btn btn-10">Read More</button>
      <button class="custom-btn btn-11">Read More<div class="dot"></div></button>
      <button class="custom-btn btn-12"><span>Click!</span><span>Read More</span></button>
      <button class="custom-btn btn-13">Read More</button>
      <button class="custom-btn btn-14">Read More</button>
      <button class="custom-btn btn-15">Read More</button>
      <button class="custom-btn btn-16">Read More</button>
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


</style>
