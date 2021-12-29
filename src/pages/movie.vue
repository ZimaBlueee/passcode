<template>
  <div>
    <div class="center">
      <img src="../../static/img/dog.gif" alt="" class=""  width="20%" style="min-width:200px">
      <h1>{{ msg }}</h1>
      <div class="search">
        <el-input placeholder="请输入内容" v-model="keyWord" clearable class="input-with-select" @change="onSearch">
          <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
        </el-input>
      </div>
    </div>

    <el-table
      v-loading="loading"
      element-loading-text="拿了么正在拼了命的搜索中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      :data="tableData"
      stripe
      show-overflow-tooltip
      highlight-current-row
      empty-text="暂无数据"
      align="center"
      style="width: 100%">
      <el-table-column
        prop="question"
        align="center"
        label="资源">
      </el-table-column>
      <el-table-column
        prop="answer"
        align="center"
        label="链接">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      msg: "都是兄弟，别客气",
      keyWord: '',
      loading: false,
      tableData: []
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },
    onSearch() {
      this.loading = true;
      this.axios.get('/videoSearch/searchVideoByHotlink?keyWord=' + this.keyWord).then(res => {
        this.tableData = res.data
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.tableData = [{"question": "服务器居然出故障了!", "answer": "请稍后再试或者联系管理员噢，如果你认识的话 :)"}]
        this.loading = false;
      });

    },
  },
  mounted() {
  }

}
</script>

<style lang="scss">

</style>
