<template>
  <div>
      <el-header class="bg-dark" height="50px">
          <i class="el-icon-s-home" @click="toRouter('/home')"></i>
      </el-header>
      <el-main>
         <router-view></router-view>
      </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
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
.el-header{
  
  i{
    font-size: 40px;
    color: #fff;
    float: right;
    line-height: 50px;
    cursor:pointer;
  }
}

</style>