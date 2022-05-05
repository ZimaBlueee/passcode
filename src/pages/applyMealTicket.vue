<template>
  <div>
    <el-form ref="form" :label-position="labelPosition" :model="form" class="center">
      <el-form-item label="员工">
        <el-autocomplete
          clearable
          class="inline-input"
          v-model="form.user"
          :fetch-suggestions="querySearch"
          placeholder="请输入员工姓名"
          @select="handleSelect"
        ></el-autocomplete>
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
        user: '',
        userId: '',
      },
      verifycode: '',
      labelPosition: 'right'
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },

    onSubmit() {
      this.axios({
        method: 'get',
        url: '/meal/generateQRCode?userId=' + this.form.userId,
        responseType: 'blob'
      }).then(res => {
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
