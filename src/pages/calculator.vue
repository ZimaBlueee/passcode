<template>
  <div class="calculator">
    <el-row :gutter="20">
      <el-col :span="6" :offset="10">
        <img src="../../static/img/hashiqi.gif" alt="" class="">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="9">
        <div>
          输入你的身高：
          <el-input style="width: 95px;" placeholder="请输入" v-model="input" maxlength="3" show-word-limit></el-input>
          CM
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="11">
        <el-button type="success" plain @click="result">开始计算</el-button>
      </el-col>
    </el-row>
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
  font-size: 50px;
  //margin: 100px 0px 400px;
}


</style>
