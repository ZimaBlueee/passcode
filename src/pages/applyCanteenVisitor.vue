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

    onSubmit() {
      this.axios({
        method: 'get',
        url: '/meal/generateVisitorQRCode?phone=' + this.form.phone,
        responseType: 'blob'
      }).then(res => {
        console.log("返回值="+res)
        this.verifycode = window.URL.createObjectURL(res)
      })
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
.el-autocomplete {
  width: 8rem;
}

//label{
//  display:inline-block;
//  width:2rem;
//
//  text-align:right;
//}

</style>
