<template>
  <!-- 核酸登记页 -->
  <div>
    <div class="queryCard">
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd">
      </el-date-picker>
      <div style="width:200px;display:inline-block">
        <el-input v-model="username" placeholder="姓名" :clearable="true"></el-input>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="queryTodayUserClick">查询</el-button>
    </div>
    <div class="toolbar">
      <el-button type="primary" size="small" @click="generateTodayUser">生成今日登记表</el-button>
      <el-button type="warning" size="small" @click="helpEmployeeRegister">帮不便员工登记</el-button>
    </div>
    <div class="tableTop">
      <div><span>未登记</span><font color="red">{{ this.unregisteredNum }}</font></div>
      <div><span>已登记</span><font color="green">{{ this.registeredNum }}</font></div>
    </div>

    <el-table
      v-loading="loading"
      element-loading-text="加载数据中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentRowChange"
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="sysUser.username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sysUser.mobile"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="sysUser.deptName"
        label="归口部门">
      </el-table-column>
      <el-table-column
        prop="sysUser.nickName"
        label="核酸编号">
      </el-table-column>
      <el-table-column
        prop="today"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="check"
        label="是否登记">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.check == '0' ? 'danger' : 'success'"
          >
            <span v-if="scope.row.check=='0'">否</span>
            <span v-if="scope.row.check=='1'">是</span>
          </el-tag>

        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=currentPage
      :page-sizes="[50, 100, 200, 400]"
      :page-size=pageSize
      layout="total, sizes, prev, pager, next, jumper"
      :total=total>
    </el-pagination>
  </div>

</template>

<script>
export default {
  data() {
    return {
      username: '',
      date: '',
      tableData: [],
      currentPage: 1,
      pageSize: 50,

      currentRow: null,

      total: 0,
      unregisteredNum: 0,
      registeredNum: 0,
      loading: false
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },

    handleCurrentRowChange(val) {
      this.currentRow = val;
      console.log(this.currentRow)
    },

    helpEmployeeRegister() {
      if (!this.currentRow) {
        this.$message.error('请先选择人员');
        return
      }
      this.axios
        .get(`/sysUser/helpEmployeeRegister/${this.currentRow.checkInId}`)
        .then(res => {
          this.$message.success('帮员工登记成功');
          this.queryTodayUser()
        });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.queryTodayUserClick();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryTodayUser();
    },

    queryTodayUserClick(){
      this.currentPage = 1;
      this.queryTodayUser();
    },

    queryTodayUser() {
      if (!this.date) {
        this.$message({
          message: '请先选择日期',
          type: 'warning'
        });

        return;
      }
      this.loading = true;

      const data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      const params = {
        'today': this.date,
        'username': this.username
      }
      this.tableData = []
      this.axios
        .post(`/meal/queryTodayUser/`, data, {params})
        .then(res => res.data)
        .then(data => {
          this.tableData = data.items;
          this.total = data.total
          this.unregisteredNum = data.unregisteredNum
          this.registeredNum = data.registeredNum
          this.loading = false;
        }).catch((err) => {
          console.log(err)
          this.loading = false;
        }
      )
    },

    generateTodayUser() {
      this.loading = true;
      const today = new Date().Format("yyyy-MM-dd");
      this.axios
        .get(`/meal/generateTodayUser/${today}`)
        .then(res => {
          console.log(res)
          this.loading = false;
          this.queryTodayUserClick()
        })
        .catch((err) => {
          this.loading = false;
        })
    },

    formatBreakFast(row, index) {
      if (row.breakfast) {
        return "已登记";
      }
    },

    formatLunch(row, index) {
      if (row.lunch && row.lunchPack) {
        return "已登记(打包)";
      } else if (row.lunch && !row.lunchPack) {
        return "已登记";
      }
    },

    formatDinner(row, index) {
      if (row.dinner && row.dinnerPack) {
        return "已登记(打包)";
      } else if (row.dinner && !row.dinnerPack) {
        return "已登记";
      }
    },

  },

  created() {
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }

    this.date = new Date().Format("yyyy-MM-dd");
    this.queryTodayUserClick()
  }
}
</script>

<style lang="scss">
.el-pagination {
  margin-top: .25rem;
  text-align: right;
}

.el-descriptions {
  margin-top: .25rem;
}

.tableTop {
  font-size: 28px;
  width: 100%;
  padding: 5px;
  overflow: hidden;

  div {
    float: left;
    width: 20%;
    min-width: 200px;

    span {
      font-weight: bold;
      font-size: 18px;
      color: #909399;
      margin-right: 10px;
    }
  }
}

.el-table {
  margin-top: .4rem;
}

</style>
