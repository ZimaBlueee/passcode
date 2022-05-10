<template>
  <div>
    <div class="block center">
      <el-carousel :interval="4000" type="card" height="7rem" >
        <el-carousel-item v-for="item in imgList" :key="item.index" >
          <img :src="item.src" style="width:100%;height:100%" alt="图片丢失了" :title="item.title"/>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="welcome-title">
      <h2>Born to Love</h2>
    </div>

    <el-row>
      <el-col :span="12" class="center"><img src="../../static/img/dragon.png" alt="" class="pic1" width="80%"></el-col>
      <el-col :span="12" class="center"><img src="../../static/img/tree2.png" alt="" class="pic2" width="80%"></el-col>
    </el-row>


    <!--<div class="menu">-->
    <!--    <el-col v-for="(item,index) in menuList" :key="index" :span="6">-->
    <!--      <div class="menu-item bg-dark" @click="toRouter(item.path)">-->
    <!--        <i :class="item.icon"></i><br/>-->
    <!--        {{item.name}}-->
    <!--      </div>-->
    <!--    </el-col>-->
    <!--</div>-->


  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      keyWord: '',
      // menuList:[{
      //   name:"电影",
      //   icon:"el-icon-video-camera-solid",
      //   path:"/movie"
      // },{
      //   name:"测试",
      //   icon:"el-icon-video-camera-solid",
      //   path:"/test"
      // },{
      //   name:"电影",
      //   icon:"el-icon-video-camera-solid",
      //   path:"movie"
      // },{
      //   name:"电影",
      //   icon:"el-icon-video-camera-solid",
      //   path:"/movie"
      // },{
      //   name:"电影",
      //   icon:"el-icon-video-camera-solid",
      //   path:"/movie"
      // },{
      //   name:"电影",
      //   icon:"el-icon-video-camera-solid",
      //   path:"/movie"
      // }],
      imgList: [
        {
          name: "tree",
          src: require("../../static/img/slience.png"),
          title: "寂"
        },
        {
          name: "lake",
          src: require("../../static/img/beach.png"),
          title: "春"
        },
        {
          name: "night",
          src: require("../../static/img/sunset2.png"),
          title: "湖"
        },

        {
          name: "car",
          src: require("../../static/img/star.png"),
          title: "末"
        },
      ]
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    }
  },
  mounted() {
  }

}
</script>

<style lang="scss">
.search {
  width: 70%;
  margin: .20rem auto;
}

.el-row {
  margin-bottom: .20rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  padding: .10rem;

}

.menu-item {
  border-radius: .04rem;
  padding: .10rem;
  text-align: center;
  color: aliceblue;
  cursor: pointer;
  box-shadow: 3px 3px 10px #8B8B8B;;

  i {
    font-size: .50rem;
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: .14rem;
  opacity: 0.75;
  line-height: 2rem;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.welcome-title {
  text-align: center;
  margin: .50rem 0 .50rem;
  font-size: .40rem;
  color: #ccccd6;
}

.pic1 {
  width: 4.8rem;
  height: 10rem;
}
.pic2 {
  width: 4.8rem;
  height: 10rem;
}
</style>
