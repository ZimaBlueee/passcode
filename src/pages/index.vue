<template>
  <div>
    <el-container>
      <el-header height="50px">
        <!--<img src="../../static/img/naleme.png" alt="" class="logo1" @click="toRouter('/home')">-->
        <div class="navbar">
          <!--<div v-if=flag>-->
          <!--  <button class="custom-btn btn-6" @click="toRouter('/home')"><span>主页</span></button>-->
          <!--  <button class="custom-btn btn-12" @click="toRouter('/movie')"><span>你想要的这里都有</span><span>影视搜索</span>-->
          <!--  </button>-->
          <!--  <button class="custom-btn btn-8" @click="toRouter('/calculator')"><span>身高计算器</span></button>-->
          <!--  <button class="custom-btn btn-14" @click="notify">文档阅读</button>-->
          <!--  <button class="custom-btn btn-13" @click="notify">视频观看</button>-->
          <!--</div>-->

          <!--          <div v-if=flag class="title">-->
          <!--            <span @click="toRouter('/home')">主页</span>-->
          <!--            <span @click="toRouter('/movie')">影视搜索</span>-->
          <!--            <span @click="toRouter('/calculator')">身高计算器</span>-->
          <!--            <span @click="toRouter('/read')">文档阅读</span>-->
          <!--            <span @click="notify">视频观看</span>-->
          <!--          </div>-->

          <el-menu v-if=flag :default-active="activeIndex" class="el-menu" mode="horizontal"
                   active-text-color="#c04851">
            <el-menu-item index="home" @click="toRouter('/home')">主页</el-menu-item>
            <!--<el-menu-item index="applyMealTicket" @click="toRouter('/applyMealTicket')">申请饭票</el-menu-item>-->
            <!--<el-menu-item index="readMealTicket" @click="toRouter('/readMealTicket')">扫一扫</el-menu-item>-->
            <!--<el-menu-item index="mealReport" @click="toRouter('/mealReport')">就餐报告</el-menu-item>-->
            <el-menu-item index="movie" @click="toRouter('/movie')">影视搜索</el-menu-item>
            <el-menu-item index="game"><a href="http://fc.zima.link" target="_blank">任天堂游戏</a></el-menu-item>
            <el-menu-item index="calculator" @click="toRouter('/calculator')">身高计算器</el-menu-item>
            <el-menu-item index="read" @click="toRouter('/read')">文档阅读</el-menu-item>
            <el-menu-item index="5" disabled>视频观看</el-menu-item>
          </el-menu>

          <el-menu v-else :default-active="activeIndex" class="el-menu" mode="vertical" :collapse="isCollapse"
                   active-text-color="#c04851">
            <el-submenu index="1-1">
              <template slot="title">
                <i class="el-icon-s-unfold"></i>
              </template>
              <el-menu-item index="home" @click="toRouter('/home')">主页</el-menu-item>
              <!--<el-menu-item index="applyMealTicket" @click="toRouter('/applyMealTicket')">申请饭票</el-menu-item>-->
              <el-menu-item index="readMealTicket" @click="toRouter('/readMealTicket')">扫一扫</el-menu-item>
              <!--<el-menu-item index="mealReport" @click="toRouter('/mealReport')">就餐报告</el-menu-item>-->
              <el-menu-item index="movie" @click="toRouter('/movie')">影视搜索</el-menu-item>
              <el-menu-item index="game"><a href="http://fc.zima.link" target="_blank">任天堂游戏</a></el-menu-item>
              <el-menu-item index="calculator" @click="toRouter('/calculator')">身高计算器</el-menu-item>
              <el-menu-item index="read" @click="toRouter('/read')">文档阅读</el-menu-item>
              <el-menu-item index="1-1-5" disabled>视频观看</el-menu-item>
            </el-submenu>
          </el-menu>
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
    return {
      flag: true,
      activeIndex: 'home',
      isCollapse: true
    }
  },
  methods: {
    toggleCollapse() {
      // this.$set(this.isCollapse, 0, true)
      this.isCollapse = true;
    },
    toRouter(val) {
      this.$router.push(val);
      this.toggleCollapse();
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
    let path = this.$route.path;
    this.activeIndex = path.split("/")[1];
  },
  created() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }

}
</script>

<style lang="scss">
.el-header {
  padding: 0;

  .navbar {
    text-align: right;

    .el-menu {
      float: right;
      //z-index: 9999;
    }

    .el-menu.el-menu--horizontal {
      border-bottom: solid 1px rgba(0, 0, 0, 0);
    }

    .el-menu-item {
      font-size: 0.2rem;
    }

    .title {
      span {
        display: inline-block;
        font-size: .2rem;
        line-height: .50rem;
        color: #222222;
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }

}

.el-submenu__title {
  .el-icon-arrow-down:before {
    content: "";
  }
}

.logo1 {
  float: left;
}


</style>
