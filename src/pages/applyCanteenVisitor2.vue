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
      let userId = localStorage.getItem("userId");
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
      this.$alert('<font color=green>“生活区通行码”</font>是生活区每位员工的特殊识别码，请妥善保管通行码，切勿泄露给他人。<br/><br/><span style="color: #346c9c">请提前截图保存至手机相册</span>', '员工须知', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '我已知晓',
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
