<template>
  <div class="read">
    <!--<el-button @click="addMenu" size="mini" type="primary" icon="el-icon-plus">新增</el-button>-->
    <el-input
      size="small"
      placeholder="输入关键字进行过滤(区分大小写)"
      v-model="filterText">
    </el-input>
    <el-tree
      :data="tableData"
      node-key="id"
      v-loading="loading"
      element-loading-text="加载pdf中，服务器比较便宜，带宽最高640kb/s哦 : )"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :expand-on-click-node="false"
      :default-expanded-keys="[0]"
      :filter-node-method="filterNode"
      ref="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => addMenu(data)">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(data)">
            删除
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => upload(data)">
            上传
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => preview(data)">
            阅读
          </el-button>
        </span>
      </span>
    </el-tree>

    <!--新增目录-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%">
      <el-form
        :inline="true"
        size="mini"
        :model="addForm"
        ref="addForm"
        label-width="80px"
      >
        <el-form-item prop="parentName" label="上级目录">
          <el-input readonly v-model="addForm.parentName"></el-input>
        </el-form-item>
        <el-form-item prop="bookName" label="目录名称">
          <el-input v-model="addForm.bookName" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addComit">确 定</el-button>
      </span>
    </el-dialog>

    <!--选择上级菜单 弃用-->
    <el-dialog title="上级菜单" :visible.sync="parentDialogVisible" width="25%">
      <!--<tree :nodes="nodes"/>-->
      <el-tree :data="nodes" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="parentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleParentDialogClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="上传" :visible.sync="uploadDialogVisible">
      <el-upload
        drag
        :action="uploadUrl()"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :before-upload="beforeUpload"
        :show-file-list="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传pdf文件</div>
      </el-upload>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      dialogTitle: "",
      dialogVisible: false, // 控制新增弹框显示和隐藏
      //存储表单数据
      addForm: {
        id: "", //编辑id
        bookName: "",
        parentId: "",
        parentName: "",
        orderNum: "",
      },
      parentDialogVisible: false, // 控制上级目录显示
      nodes: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      parentDialogId: '', // 上级目录选中的id
      parentDialogName: '', // 上级目录选中的name
      uploadDialogVisible: false,
      bookId: null, // 当前选中的目录
      filterText: '',
    }
  },
  methods: {
    toRouter(val) {
      this.$router.push(val);
    },
    // 新增目录点击事件
    addMenu(val) {
      // 标志新增
      // this.editTag = "0";
      this.dialogTitle = "新增目录";
      this.dialogVisible = true;
      // 清空表单数据
      this.resetForm("addForm");

      this.addForm.parentId = val.id
      this.addForm.parentName = val.name
    },
    // 解决重置表单时报 'resetFields' of undefined的错
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    // 提交新增目录
    addComit() {
      this.axios.post("/readPdf/addBook", this.addForm).then(res => {
        this.dialogVisible = false;
        this.getBookList();
      }).catch(err => {

      })
    },
    // 回显上级目录
    selectParent() {
      this.parentDialogVisible = true
    },
    // 弃用
    handleNodeClick(data) {
      this.parentDialogId = data.id
      this.parentDialogName = data.name
    },
    // 获取整颗树
    async getBookList() {
      await this.axios.get("/readPdf/getBookList").then(res => {
        this.tableData = res.data
        // this.nodes = res.data
      });
    },
    // 弃用
    handleParentDialogClick() {
      this.addForm.parentId = this.parentDialogId
      this.addForm.parentName = this.parentDialogName
      this.parentDialogVisible = false
    },
    // 上传按钮
    upload(data) {
      if (data.fileId == null) {
        this.bookId = data.id;
        this.uploadDialogVisible = true;
      } else {
        const h = this.$createElement;
        this.$notify({
          title: '错误',
          message: h('i', {style: 'color: #ef475d'}, '文件已上传，请删除文件后再重新上传')
        });
      }
    },
    // 上传接口
    uploadUrl() {
      return process.env.API_ROOT + '/readPdf/uploadPdf?bookId=' + this.bookId;
    },
    // 上传之前
    beforeUpload(val) {
      // 检查文件格式
      let type = val.type;
      if (type !== 'application/pdf') {
        const h = this.$createElement;
        this.$notify({
          title: '错误',
          message: h('i', {style: 'color: #ef475d'}, '只能上传PDF文件')
        });
        return false;
      }
    },
    // 上传成功
    handleUploadSuccess(res) {
      this.uploadDialogVisible = false;
      const h = this.$createElement;
      this.$notify({
        title: '成功',
        message: h('i', {style: 'color: teal'}, '文件上传成功')
      });
      this.getBookList();
    },
    // 上传失败
    handleUploadError(err) {
      this.$message.error(JSON.parse(err.message));
    },
    // 预览pdf
    async preview(val) {
      let fileId = val.fileId;
      if (fileId == null) {
        const h = this.$createElement;
        this.$notify({
          title: '失败',
          message: h('i', {style: 'color: #ef475d'}, '未上传PDF')
        });
      } else {
        this.loading = true;
        await this.axios
          .get("/readPdf/readPdfById/" + fileId, {responseType: "blob"})
          .then(res => {
            let blob = new Blob([res.data], {type: "application/octet-stream"});
            let url = window.URL.createObjectURL(blob);
            window.open('static/pdfjs-2.6.347/web/viewer.html?file=' + encodeURIComponent(url))
            this.loading = false;
          })
          .catch(err => {
            const h = this.$createElement;
            this.$notify({
              title: '错误',
              message: h('i', {style: 'color: #ef475d'}, '预览失败，请联系管理员')
            });
            this.loading = false;
          });
      }
    },
    // 搜索
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 删除
    remove(data) {
      console.log(data);
      const h = this.$createElement;
      this.$notify({
        title: '失败',
        message: h('i', {style: 'color: #ef475d'}, '你没有删除的权限哦')
      });
    },
  },
  mounted() {
  },
  created() {
    this.getBookList();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
}
</script>

<style lang="scss">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
