<template>
  <div>
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd">
    </el-date-picker>

    <el-button type="primary" icon="el-icon-search" @click="queryVisitorReport">查询</el-button>

    <el-descriptions title="统计" :column="3" border>
      <el-descriptions-item label="进入人数">
        <el-tag>{{ this.total}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="扫码次数">
        <el-tag>{{ this.totalScanQR }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <el-table
      v-loading="loading"
      element-loading-text="加载数据中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="sysUser.username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sysUser.mobile"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="today"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="todayCount"
        label="当天扫码次数">
      </el-table-column>
      <el-table-column
        prop="log"
        label="记录">
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
      tableData: [],
      dateRange: '',
      currentPage: 1,
      pageSize: 50,
      total: 0,
      totalVisitor: 0,
      totalScanQR: 0,
      loading: false
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.queryVisitorReport();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryVisitorReport();
    },

    queryVisitorReport() {
      if (!this.dateRange) {
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
        'startDate': this.dateRange[0],
        'endDate': this.dateRange[1]
      }

      this.axios
        .post(`/meal/queryVisitorReport/`, data, {params})
        .then(res => res.data)
        .then(data => {
          this.tableData = data.items;
          this.total = data.total
          this.totalVisitor = data.totalVisitor
          this.totalScanQR = data.totalScanQR

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

    const today = new Date().Format("yyyy-MM-dd");
    this.dateRange = [today, today]
    this.queryVisitorReport()
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

.el-table {
  margin-top: .4rem;
}
</style>
