<template>
  <div>
    <div class="center">
      <img src="../../static/img/dog.gif" alt="" class="" width="20%" style="min-width:200px">
      <!--<h1>{{ msg }}</h1>-->
      <div class="search">
        <el-input placeholder="请输入内容" v-model="keyWord" clearable class="input-with-select" @change="onSearch">
          <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
        </el-input>
      </div>
    </div>

    <h1 class="center">{{ welcome }}</h1>

    <el-table
      v-loading="loading"
      element-loading-text="拿了么正在拼了命的搜索中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
        <template slot-scope="scope">
          <p v-html='scope.row.answer'></p>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total=parseInt(total)>
    </el-pagination>
  </div>
</template>

<script>

export default {
  data() {
    return {
      msg: "都是兄弟，别客气",
      keyWord: '',
      loading: false,
      tableData: [],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      welcome: ''
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },
    onSearch() {
      this.loading = true;
      this.welcome = this.keyWord === '' ? this.welcome = '热门搜索' : this.welcome = '[' + this.keyWord + ']的搜索结果';
      this.axios.get('/videoSearch/searchVideoByHotlink?keyWord=' + this.keyWord).then(res => {
        this.tableData = res.data
        this.total = res.data.length
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.tableData = [{"question": "服务器居然出故障了!", "answer": "请稍后再试或者联系管理员噢，如果你认识的话 :)"}]
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  mounted() {
  },
  created() {
    this.onSearch()
    this.welcome = '热门搜索'
  }

}
</script>

<style lang="scss">
.el-pagination {
  margin-top: .25rem;
  text-align: right;
}

.search {
  margin-top: .1rem;
  margin-bottom: .25rem;
}
</style>
