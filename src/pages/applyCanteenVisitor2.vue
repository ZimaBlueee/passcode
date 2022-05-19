<template>
  <div>
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
      let that = this
      let userId = sessionStorage.getItem("userId");
      this.axios({
        method: 'get',
        url: '/meal/generateVisitorQRCode?userId=' + userId,
        responseType: 'blob'
      }).then(res => {
          let data = res;
          let fileReader = new FileReader();
          fileReader.onload = function () {
            try {
              let jsonData = JSON.parse(this.result);
              if (jsonData.code) {
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
              // 检查次数
              that.checkCount()
            }
          };
          fileReader.readAsText(data);
        }
      )
    },

    checkCount() {
      this.$alert('<span style="color: #346c9c">请提前截图保存至手机相册,进入食堂时向志愿者出示,</span><br/><br/><font color=red>请勿</font>将二维码泄露给他人,<br/><br/> 如果检测到共享通行码会被<font color=red>追究责任</font>', '员工须知', {
        dangerouslyUseHTMLString: true
      });
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
  },
  created() {
    this.onSubmit()
  }

}
</script>

<style lang="scss">

</style>
