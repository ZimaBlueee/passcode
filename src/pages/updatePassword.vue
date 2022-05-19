<template>

  <div>
    <el-form :model="form" ref="pwdForm" :rules="rules">
      <el-form-item label="原密码" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="form.checkPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('pwdForm')">确 定</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    // 校验原密码
    let validatePass = (rule, value, callback) => {
      let userId = localStorage.getItem("userId");

      const data = {
        userId: userId,
        oldPassword: this.form.password
      };

      this.axios.post('/sys/checkOldPassword', data)
        .then(res => {
          console.log(res)
          if (res.data != null) {
            callback(new Error(res.data));
          } else {
            console.log(11112)
            callback();
          }
        })
    };

    // 检测新密码和确认密码一致性
    let checkpass = (rule, value, callback) => {
      if (value === this.form.newPassword) {
        callback();
      } else {
        callback(new Error("密码不一致"));
      }
    };

    let validChinese = (rule, value, callback) => {
      // let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/
      let reg = /[^\u00-\uFF]/
      if (reg.test(value)) {
        callback(new Error('不能含有中文'))
      } else {
        callback()
      }
    };

    let validLength = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9]{6,20}$/
      if (!reg.test(value)) {
        callback(new Error('应由6-20位字母或者数字组成'))
      } else {
        callback()
      }
    };

    return {
      rules: {
        password: [
          {required: true, message: "请输入原密码", trigger: "blur"},
          {validator: validatePass, message: "原密码错误", trigger: "blur"},
        ],
        newPassword: [
          {required: true, message: "请输入新密码", trigger: "blur"},
          // {validator: validChinese, trigger: "blur"},
          {validator: validLength, trigger: "blur"},
        ],
        checkPassword: [
          {required: true, message: "不能为空", trigger: "blur"},
          {validator: checkpass, trigger: "blur"},
          {validator: validLength, trigger: "blur"},
        ],
      },
      form: {
        password: "",
        newPassword: "",
        checkPassword: "",
      },
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },

    //退出登录
    async logout() {
      let res = await this.axios.get("/api/user/loginOut");
      console.log(res)
      if (res.code === "200") {
        localStorage.clear();
        window.location.href = "/login";
      }
    },

    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userId = localStorage.getItem("userId");
          const data = {
            userId: userId,
            oldPassword: this.form.password,
            newPassword: this.form.newPassword,
          };

          this.axios.post('/sys/updatePassword', data)
            .then(res => {
              this.$message({
                showClose: true,
                message: '密码修改成功',
                type: 'success'
              });

              this.logout();
            })

        } else {
          this.$message({
            showClose: true,
            message: '验证不通过',
            type: 'error'
          });
          return false;
        }
      });
    },


  },
  mounted() {
  },

}
</script>

<style lang="scss">


</style>
