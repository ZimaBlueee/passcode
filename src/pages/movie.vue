<template>
  <div>
    <div class="center">



      <section class="icon-list">
        <!--<i class="nes-icon is-large heart"></i>-->
        <!--<i class="nes-icon is-large heart"></i>-->
        <!--<i class="nes-icon is-large is-half heart"></i>-->
        <i class="nes-mario"></i>
        <i class="nes-ash"></i>
        <i class="nes-pokeball"></i>
        <i class="nes-bulbasaur"></i>
        <i class="nes-charmander"></i>
        <i class="nes-squirtle"></i>
        <i class="nes-kirby"></i>
        <!--<i class="nes-icon coin is-large"></i>-->
        <!--<span class="nes-text is-primary">x</span>-->
        <!--<span class="nes-text is-error">99</span>-->
      </section>

      <div class="search">
        <div class="nes-field is-inline">
          <input type="text" class="nes-input is-success" placeholder="请输入关键字搜索" v-model="keyWord"></input>
          <button type="button" class="nes-btn is-primary" @click="onSearch">搜 索</button>
        </div>
      </div>
    </div>

    <!--<div class="nes-container is-dark">-->
    <!--  <p class="center">{{ welcome }}</p>-->
    <!--</div>-->

    <progress v-if="loading" class="nes-progress is-pattern" :value="processVal" max="100"></progress>

    <div v-else class="nes-container is-dark with-title">
      <p class="title">{{ welcome }}</p>
      <div class="nes-table-responsive" align="center">
        <table class="nes-table is-bordered is-dark center">
          <thead>
          <tr>
            <th>资源名</th>
            <th>网盘链接</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(link, index) in tableData">
            <td><span class="nes-text is-warning">{{ link.question }}</span></td>
            <td>
              <p v-html='link.answer'></p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
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
      welcome: '',
      processVal: 20
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },

    processMove() {
      if (this.processVal < 99) {
        this.processVal = this.processVal + 20;
        console.log(this.processVal)
      }
    },

    onSearch() {
      this.loading = true;
      this.timer = setInterval(this.processMove, 600);

      this.welcome = this.keyWord === '' ? this.welcome = '热门搜索' : this.welcome = '[' + this.keyWord + ']的搜索结果';

      this.axios.get('/videoSearch/searchVideoByHotlink?keyWord=' + this.keyWord).then(res => {
        this.tableData = res.data
        this.total = res.data.length
        this.loading = false;
        this.processVal = 10;
        clearInterval(this.timer);
      }).catch(err => {
        console.log(err);
        this.tableData = [{"question": "服务器居然出故障了!", "answer": "请稍后再试或者联系管理员噢，如果你认识的话 :)"}]
        this.loading = false;
        this.processVal = 10;
        clearInterval(this.timer);
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
    this.welcome = '热搜排行'
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

.nes-input {
  padding: 0.1rem 0.8rem;
  max-width: 90%;
  margin: 0.3rem;
  text-align: center;
}

.nes-btn {
  //float: right;
}

.nes-container.with-title > .title {
  font-size: 0.5rem;
}

</style>
