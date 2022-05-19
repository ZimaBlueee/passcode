<template>
  <div class="center ub main-center cross-center">
    <div class="login-container">
    <el-form size="medium" :rules="rules" ref="loginForm" :model="loginForm" class="loginForm">
      <el-form-item label>
        <div class="login-title ub main-center cross-center">系统登录</div>
      </el-form-item>
      <el-form-item prop="username" label>
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" label>
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item label>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button @click="submit()" class="my-button" type="primary">登录</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="my-button">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgSrc: "",
      loginForm: {
        username: "", //登录名
        password: "", //密码
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "change",
            message: "请输入用户名"
          }
        ],
        password: [
          {
            required: true,
            trigger: "change",
            message: "请输入密码"
          }
        ]
      }
    };
  },
  created() {
    if(!!sessionStorage.getItem("token")){
      //已登录
      this.$router.push("applyCanteenVisitor");
    }
  },
  methods: {

    async submit() {
      let _this = this;
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          console.log(valid);
          let formData = new FormData();
          formData.append("username", _this.loginForm.username);
          formData.append("password", _this.loginForm.password);
          let res = await this.axios.post(
            "/api/user/login",
            formData
          );
          console.log(res);
          if (res.code === '200') {
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("userId", res.data.userId);
            sessionStorage.setItem("expireTime", res.data.expireTime);
            sessionStorage.setItem("isVolunteer", res.data.isVolunteer);
            // let menuList = res.data.menuList;
            // let routerList = res.data.routerList;
            // let authList = res.data.authList;
            // //存储菜单数据
            // sessionStorage.setItem("menuList", JSON.stringify(menuList));
            // //存储路由数据
            // sessionStorage.setItem("routerList", JSON.stringify(routerList));
            // //权限
            // sessionStorage.setItem("authList", JSON.stringify(authList));
            //提交到store
            // this.$store.commit("getMenuList", this.$router);
            //登录成功跳转到首页
            this.$router.push("applyCanteenVisitor");
          } else {
            this.$message({
              type: 'success',
              message: res.msg
            })
            return;
          }
          console.log(res);
        }
      });
    },
  }
};
</script>


<style lang="scss" scoped>
.login-container {
  height: 100%;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
}

.loginForm {
  height: 300px;
  width: 350px;
  border-radius: 10px;
  // box-shadow: 0 0 25px #cac6c6;
  padding: 20px 35px;
  margin: 20px auto;
}

.login-container /deep/ .el-form-item__content {
  margin-left: 0 !important;
}

.my-button {
  width: 100%;
}

</style>
