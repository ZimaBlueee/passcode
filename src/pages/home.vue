<template>
  <div>
    <div class="center">
      <img src="../../static/img/dog.gif" alt="" class="">
      <h1>{{ msg }}</h1>
      <div class="search">
        <el-input placeholder="请输入内容" v-model="keyWord" clearable class="input-with-select" @change="onSearch">
          <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
        </el-input>
      </div>
    </div>
    <div class="menu">
        <el-col v-for="(item,index) in menuList" :key="index" :span="6">
          <div class="menu-item bg-dark" @click="toRouter(item.path)">
            <i :class="item.icon"></i><br/>
            {{item.name}}
          </div>
        </el-col>
    </div>
    

  </div>
</template>

<script>
export default {
  data() {
    return {
      msg:"都是兄弟，别客气",
      keyWord:'',
      menuList:[{
        name:"电影",
        icon:"el-icon-video-camera-solid",
        path:"/movie"
      },{
        name:"测试",
        icon:"el-icon-video-camera-solid",
        path:"/test"
      },{
        name:"电影",
        icon:"el-icon-video-camera-solid",
        path:"movie"
      },{
        name:"电影",
        icon:"el-icon-video-camera-solid",
        path:"/movie"
      },{
        name:"电影",
        icon:"el-icon-video-camera-solid",
        path:"/movie"
      },{
        name:"电影",
        icon:"el-icon-video-camera-solid",
        path:"/movie"
      }]
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },
    onSearch() {
    },
  },
  mounted() {
  }

}
</script>

<style lang="scss">
.search{
  width: 70%;
  margin: 20px auto;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  padding: 10px;
  
}
.menu-item{
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  color: aliceblue;
  cursor:pointer;
  box-shadow: 3px 3px 10px #8B8B8B;;
  i{
    font-size: 50px;
  }
}
</style>