<template>

  <div>
    <div align="center">
      <el-button @click="exportExcel" type="primary">下载excel批导入模板</el-button>
    </div>

    <el-upload
      class="upload-demo center"
      drag
      :action="uploadUrl()"
      :headers="config"
      :on-success="handleUploadSuccess"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },

    // 上传接口
    uploadUrl() {
      return process.env.API_ROOT + '/meal/batchImportDormUser';
    },
    // 上传成功
    handleUploadSuccess(res) {
      const h = this.$createElement;
      this.$notify({
        title: '成功',
        message: h('i', {style: 'color: teal'}, '文件上传成功')
      });
    },

    exportExcel() {
      this.axios.get('/meal/downloadExcel', {
        //服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'，默认是'json'
        responseType: "blob"
      })
        .then(res => {
          if (!res) return

          // 构造一个blob对象来处理数据，并设置文件类型
          const blob = new Blob([res], {type: 'application/vnd.ms-excel'})

          const href = URL.createObjectURL(blob) //创建新的URL表示指定的blob对象
          const a = document.createElement('a') //创建a标签
          a.style.display = 'none'
          // 指定下载链接
          a.href = href
          //指定下载文件名
          a.download = '生活区批导入模板.xlsx'
          //触发下载
          a.click()
          //释放URL对象
          URL.revokeObjectURL(a.href)

          // 这里也可以不创建a链接，直接window.open(href)也能下载
        })
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
  computed: {
    config() {
      return {token: this.token};
    },
  },


}
</script>


<style lang="scss">
.upload-demo {
  margin-top: 0.4rem;
}


</style>
