<template>
    <div class="account-manage">
        <!-- 标题 -->
        <el-card class="box-card" body-style="height:100%;">
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
        </el-card>

        <!-- 表格内容 -->
        <div class="userData">
            <el-table
            :data="tableData"
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            >
               <el-table-column
                type="selection"
                width="55">
                </el-table-column>

                <el-table-column
                label="用户"
                width="200">
                    <template slot-scope="scope">{{ scope.row.username }}</template>
                </el-table-column>

                <el-table-column
                prop="password"
                label="密码"
                width="200">
                <template slot-scope="scope">{{ scope.row.password }}</template>
                </el-table-column>

                <el-table-column
                prop="region"
                label="用户组"
                width="200">
                <template slot-scope="scope">{{ scope.row.region }}</template>
                </el-table-column>

                <el-table-column
                prop="ctime"
                label="创建日期"
                width="280">
                <template slot-scope="scope">{{ scope.row.ctime |  newdate }}</template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="empty(scope.row.id)"><i class="el-icon-edit"></i>编辑</el-button>
                        <el-button size="mini" type="danger" @click="delData(scope.row.id)"><i class="el-icon-delete"></i>删除</el-button>
                        
                        <el-dialog title="修改用户" :visible.sync="dialogFormVisible" width="30%">
                          <el-form :model="form" :rules="rules2" ref="form">

                            <el-form-item label="密码" prop="oldpassword" :label-width="formLabelWidth">
                              <el-input v-model="form.oldpassword" autocomplete="off"></el-input>
                            </el-form-item>
                            
                            <el-form-item label="用户名" prop="newname" :label-width="formLabelWidth">
                              <el-input v-model="form.newname" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="用户组" prop="group" :label-width="formLabelWidth">
                              <el-select v-model="form.group" placeholder="请选择用户组">
                                <el-option label="普通用户" value="普通用户"></el-option>
                                <el-option label="超级管理员" value="超级管理员"></el-option>
                              </el-select>
                            </el-form-item>

                          </el-form>
                          <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="editData('form')">确 定</el-button>
                          </div>
                        </el-dialog>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1, 5, 10]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>

            <div style="margin-top: 20px">
              <el-button type="danger" @click="batchRemove">批量删除</el-button>
              <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
            </div>
        </div>
        
    </div>
</template>

<script>
import moment from "moment"
export default {
    data() {
      return {

        // prop属性定义的规则
        rules2: {
            oldpassword:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            newname:[
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            group:[
              {required: true, message: '请选择用户组', trigger: 'change'}
            ]
        },
         
        //编辑信息表
        dialogFormVisible: false,
        form: {
          newname:'',
          oldpassword:'',
          group:'',
          id:''
        },
        formLabelWidth: '70px',
        dataId:[],
        // 用户信息表
        tableData: [{
          username: '',
          password: '',
          region: '',
          ctime:''
        }],
        // 分页
        currentPage:1,
        pageSize:5,
        total:0,
        
      }
    },
    methods: {
      // 初始化数据
      empty(id){
        this.form= {},
         this.dialogFormVisible=true;
         // 获取id
         this.form.id = id;
      },
      // 修改数据
      editData(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            this.req.post("/account/editaccount",this.form)
            .then(res => {
              this.tableData.username = res.username;
              this.tableData.password = res.password;
              this.tableData.region = res.region;
              // 刷新列表
              this.pageData();
            })
            .catch(err => {
              console.log(err)
            })
            this.dialogFormVisible =  false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 删除数据
      delData(id){
          this.$confirm('想好了再删!', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.req.get("/account/accountdelete",{id})
              .then(res => {
                // 接收数据
                let { code ,reason} = res;
                // 判断
                if(code === 0){
                  this.$message({
                      message: reason,
                      type: 'success',
                  })
                  // 调用方法 刷新列表
                  this.pageData();
                }else if( code === 1){
                  this.$message({
                      message: reason,
                      type: 'error',
                  })
                }
              })
          }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
        });
      },
      // 取消选择
      toggleSelection() {
          this.$refs.multipleTable.clearSelection();
      },
      // 获取多条数据id
      handleSelectionChange(val) {
          this.dataId = val.map(v => v.id);
      },
      // 批量删除
      batchRemove(){
        if(!this.dataId.length){
          return false;
        }

          this.$confirm('想好了再删!', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.req.get("/account/batchremove",this.dataId)
                  .then(res => {
                      let {code, reason} = res;
                      if(code === 0){
                        this.$message({
                          type:'success',
                          message:reason
                        })
                      this.pageData();
                    }else if(code === 1){
                      this.$message({
                        type:'eroor',
                        message:'reason'
                      })
                    }
                  })
                  .catch(err => {
                    console.log(err)
                  })
          }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
        });
        
        


        // 发送请求数据
        
      },
      // 分页
      // 发送请求数据函数
      pageData(){
        let params = {
          pageSize : this.pageSize,
          currentPage : this.currentPage,
        }
        this.req.get("/account/pagingData",params)
            .then(res => {
              let {total,data} = res;
              this.total = total;
              
              // 解决删除当前页最后一条数据的bug
              if(data.length === 0 && params.currentPage>1){
                params.currentPage -= 1;
                this.req.get("/account/pagingData",params)
                    .then(res => {
                      let {total,data} = res;
                      this.total = total;
                      this.tableData = data;
                    })
                    .catch(err => {
                      console.log(err)
                    })
              }
                this.tableData = data;
            })
            .catch(err => {
              console.log(err)
            })
      },
      // 页面条数变化触发
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageData()
      },
      // 页码变化触发
      handleCurrentChange(val) {
        this.currentPage = val;
        this.pageData()
      }
    },
    // 生命周期 用于刷新列表
    created(){
      this.pageData();
    },
    filters:{
      newdate(val){
        return moment(val).format("YY-MM-DD HH:MM:SS");
      }
    }
}
</script>

<style lang="less">
@import "./accountManage.less";
</style>
