<template>
  <div>
    <el-container>
      <el-header height="50px">
        <i @click="notify">程序员类视频观看</i>
        <i @click="notify">程序员类文档阅读</i>
        <i @click="toRouter('/calculator')">身高计算器</i>
        <i @click="toRouter('/movie')">影视搜索</i>
        <i @click="toRouter('/home')">主页</i>
        <img src="../../static/img/naleme.png" alt="" class="logo1" @click="toRouter('/home')">
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },
    notify() {
      const h = this.$createElement;

      this.$notify({
        title: 'Tips',
        message: h('i', { style: 'color: teal'}, '正在开发中，敬请期待哦')
      });
    },
  },
  mounted() {
  }

}
</script>

<style lang="scss">
.el-header {

  i {
    font-size: 30px;
    color: #222222;
    float: right;
    line-height: 50px;
    cursor: pointer;
    margin:10px 50px 10px;
    font-style: normal;
  }
}

.logo1{
  margin:10px 50px 10px;
}


</style>
