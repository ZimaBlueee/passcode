<template id="app">
  <div class="hello">
    <h1>{{ msg }}</h1>

    <el-input style="width: 70%" clearable placeholder="请输入内容" v-model="keyWord" class="input-with-select"
              @change="onSearch">
      <el-button slot="append" icon="el-icon-search" @click="searchVideo">搜索</el-button>
    </el-input>

    <template>
      <el-table
          v-show="flag"
          v-loading="loading"
          element-loading-text="你健正在拼了命的搜索中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
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
    </template>

  </div>
</template>

<script>
import Vue from 'vue';
import {Table, TableColumn, Loading, Input, Icon, Button} from 'element-ui';
import {queryFilms} from "../utils/api";

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      keyWord: '',
      list: [],
      loading: false,
      tableData: [],
      flag: false,
    };
  },
  methods: {
    onSearch() {
      this.searchVideo()
    },
    searchVideo() {
      this.flag = true
      this.loading = true;

      queryFilms(this.keyWord).then(res => {
        this.tableData = res.data.list
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.tableData = [{"question": "服务器居然出故障了!", "answer": "请稍后再试或者联系你健噢"}]
        this.loading = false;
      });

    },
  },
}
</script>


<style>

</style>
