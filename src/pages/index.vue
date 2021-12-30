<template>
  <div>
    <el-container>
      <el-header height="50px">
        <img src="../../static/img/naleme.png" alt="" class="logo1" @click="toRouter('/home')">
        <div class="navbar frame">
          <button class="custom-btn btn-6" @click="toRouter('/home')"><span>主页</span></button>
          <button class="custom-btn btn-12" @click="toRouter('/movie')"><span>你想要的这里都有</span><span>影视搜索</span></button>
          <button class="custom-btn btn-8" @click="toRouter('/calculator')"><span>身高计算器</span></button>
          <button class="custom-btn btn-14" @click="notify">文档阅读</button>
          <button class="custom-btn btn-13" @click="notify">视频观看</button>
          <!--<span @click="toRouter('/home')">主页</span>-->
          <!--<span @click="toRouter('/movie')">影视搜索</span>-->
          <!--<span @click="toRouter('/calculator')">身高计算器</span>-->
          <!--<span @click="notify">程序员类文档阅读</span>-->
          <!--<span @click="notify">程序员类视频观看</span>-->
        </div>
        <div class="clean"></div>
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
        message: h('i', {style: 'color: teal'}, '正在开发中，敬请期待哦')
      });
    },
  },
  mounted() {
  }

}
</script>

<style lang="scss">
.el-header {
  .navbar {
    text-align: right;

    //span {
    //  display: inline-block;
    //  font-size: .3rem;
    //  line-height: .50rem;
    //  color: #222222;
    //  margin: 0 10px;
    //  cursor: pointer;
    //}
  }

}

.logo1 {
  float: left;
}


</style>
