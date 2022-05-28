<template>
  <div>
    <div class="queryCard">
      <div style="width:200px;display:inline-block">
        <el-input v-model="mobile" placeholder="手机号" :clearable="true"></el-input>
      </div>

      <el-button type="primary" icon="el-icon-search" @click="queryAllUser">查询</el-button>
    </div>
    <div class="toolbar">
      <el-button type="success" size="small" @click="addUserClick">新增</el-button>
      <el-button type="primary" size="small" @click="editUserClick">编辑</el-button>
      <el-button type="primary" size="small" @click="exportExcel">下载模板</el-button>
      <el-upload
        class="upload-button"
        :action="uploadUrl()"
        :headers="config"
        :on-success="handleUploadSuccess"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">批量导入</el-button>
      </el-upload>

      <el-button type="danger " size="small" @click="sealAccount">封号</el-button>
      <el-button type="warning" size="small" @click="unsealAccount">解封</el-button>
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
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="归口部门">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="核酸编号">
      </el-table-column>
      <el-table-column
        prop="accountNonLocked"
        label="账户是否被锁定">
        <template slot-scope="scope">
          <span v-if="scope.row.accountNonLocked === true">未锁定</span>
          <span v-else>已锁定</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="密码是否已修改">
      </el-table-column>
      <el-table-column
        prop="isVolunteer"
        label="是否是管理员">
        <template slot-scope="scope">
          <span v-if="scope.row.isVolunteer === true">是</span>
          <span v-else>否</span>
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


    <el-dialog :title="dialogTitle" width="800px" :visible.sync="dialogVisable" :close-on-click-modal="false">
      <el-form :model="dialogForm" ref="dialogForm" :rules="dialogFormRules" v-loading="dialogLoading">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="dialogForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="dialogForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth" prop="deptName">
          <el-input v-model="dialogForm.deptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员" :label-width="formLabelWidth" prop="isVolunteer">
          <el-radio-group v-model="dialogForm.isVolunteer">
            <el-radio :label='true'>是管理员</el-radio>
            <el-radio :label='false'>不是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="核酸编号" :label-width="formLabelWidth" prop="nickName">
          <el-input v-model="dialogForm.nickName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisable = false;dialogLoading=false">取 消</el-button>
        <el-button type="primary" @click="addUser" >确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      mobile: '',
      tableData: [],
      currentPage: 1,
      pageSize: 50,

      total: 0,
      loading: false,

      currentRow: null,

      formLabelWidth: "100px",

      dialogTitle:"",

      dialogVisable: false,
      dialogLoading: false,
      dialogForm: {
        isVolunteer: false
      },
      dialogFormRules: {
        username: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        deptName: [
          {required: true, message: '请输入部门', trigger: 'blur'}
        ],
        isVolunteer: [
          {required: true, message: '请选择是否是管理员', trigger: 'blur'}
        ]
      },

      token: '',


    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },

    addUserClick() {
      this.dialogTitle="新增"
      this.dialogVisable = true
      this.resetForm("dialogForm")
      this.dialogForm = {}
      // this.dialogForm.isVolunteer = false
      this.dialogForm = {isVolunteer:false}
    },
    editUserClick() {
      if (!this.currentRow) {
        this.$message.error('请先选择人员');
        return
      }
      this.dialogTitle="编辑"
      this.dialogVisable = true
      this.resetForm("dialogForm")
      this.dialogForm = JSON.parse(JSON.stringify(this.currentRow))
      console.log(this.dialogForm)
    },

    // 解决重置表单时报 'resetFields' of undefined的错
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },

    addUser() {
      this.$refs["dialogForm"].validate((valid) => {
        if (valid) {
          this.dialogLoading = true;
          const params = this.dialogForm
          this.axios
            .post(`/sysUser/addUser`, params)
            .then(res => {
              console.log(res)
              this.dialogLoading = false;
              this.dialogVisable = false
              this.queryAllUser()
              this.$message({
                message: this.dialogTitle+'人员成功',
                type: 'success'
              });
            })
            .catch(err => {
              this.dialogLoading = false;
              console.log(err)
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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

    handleCurrentRowChange(val) {
      this.currentRow = val;
    },

    sealAccount() {
      if (!this.currentRow) {
        this.$message.error('请先选择人员');
        return
      }
      this.axios
        .get(`/meal/ban/${this.currentRow.mobile}`)
        .then(res => {
          this.$message.success('封禁成功');
          this.queryAllUser()
        });
    },

    unsealAccount() {
      if (!this.currentRow) {
        this.$message.error('请先选择人员');
        return
      }
      this.axios
        .get(`/sysUser/unblock/${this.currentRow.mobile}`)
        .then(res => {
          this.$message.success('解封成功');
          this.queryAllUser()
        });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.queryAllUser();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryAllUser();
    },

    queryAllUser() {
      this.loading = true;

      const data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      const params = {
        'mobile': this.mobile
      }

      this.tableData = []
      this.axios
        .post(`/sysUser/queryAllUser`, data, {params})
        .then(res => res.data)
        .then(data => {
          this.tableData = data.items;
          this.total = data.total
          this.loading = false;
        }).catch((err) => {
          this.loading = false;
        }
      )
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
    this.queryAllUser()
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

.upload-button {
  display: inline-block;
  margin: 0 10px;
}
</style>
