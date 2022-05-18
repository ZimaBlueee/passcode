<template>
  <div>
    <el-form ref="form" :label-position="labelPosition" inline :model="form" class="center">
      <el-form-item label="手机号">
        <!--<el-autocomplete-->
        <!--  clearable-->
        <!--  class="inline-input"-->
        <!--  v-model="form.phone"-->
        <!--  placeholder="请输入您的手机号"-->
        <!--&gt;</el-autocomplete>-->

        <el-input v-model="form.phone" placeholder="请输入您的手机号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即申请</el-button>
      </el-form-item>
    </el-form>

    <div class="center">
      <img :src="verifycode" alt class="QRcode"/>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: ''
      },
      verifycode: '',
      labelPosition: 'right'
    }
  },
  methods: {
    toRouter(val) {
      console.log(111)
      this.$router.push(val);
    },

    // onSubmit() {
    //   this.axios({
    //     method: 'get',
    //     url: '/meal/generateVisitorQRCode?phone=' + this.form.phone,
    //     responseType: 'blob'
    //   }).then(res => {
    //     console.log("返回值=" + res)
    //     this.verifycode = window.URL.createObjectURL(res)
    //   })
    // },

    onSubmit() {
      let flag1 = true
      let that = this
      this.axios({
        method: 'get',
        url: '/meal/generateVisitorQRCode?phone=' + this.form.phone,
        responseType: 'blob'
      }).then(res => {
          let data = res;
          let fileReader = new FileReader();
          fileReader.onload = function () {
            try {
              let jsonData = JSON.parse(this.result);
              if (jsonData.code) {
                flag1 = false
                console.log(flag1)
                // 报错
                that.$message({
                  showClose: true,
                  message: jsonData.msg,
                  type: 'error'
                });
              }
            } catch (err) {
              // 解析成对象失败，说明是正常的文件流
              that.verifycode = window.URL.createObjectURL(data)
            }
          };
          fileReader.readAsText(data);

          console.log(flag1)
          if (flag1) {
            // 检查次数
            this.axios
              .get('/meal/checkCount?phone=' + this.form.phone)
              .then(res => {
                console.log(res)

                this.$alert(res.data, '员工须知', {
                  dangerouslyUseHTMLString: true
                });
              });
          }
        }
      )

    },

    querySearch(queryString, cb) {
      queryString = queryString ? queryString : ''
      this.axios
        .get('/meal/queryUsersByName?userName=' + queryString)
        .then(res => {
          const result = res.data.map(item => {
            return {'id': item.userId, 'value': item.userName + "     " + item.idNumber}
          })
          cb(result)
        })
    },

    handleSelect(item) {
      this.form.userId = item.id
    },
  },

  mounted() {
  }

}
</script>

<style lang="scss">

</style>
