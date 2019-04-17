<template>
    <div class="goods-manage">
        <!-- 标题 -->
        <el-card class="box-card" body-style="height:110%;">
            <div slot="header" class="clearfix">
                <span>商品管理</span>
            </div>
        </el-card>
        <!-- 内容 -->
        <div class="product-list">
            <div class="search">
                <el-form 
                :model="searchForm" 
                ref="searchForm" 
                label-width="100px" 
                size="mini"
                
                >
                    <el-form-item label="" prop="region">
                        <el-select v-model="searchForm.region" placeholder="------选择分类------">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="家电" value="家电"></el-option>
                            <el-option label="生活用品" value="生活用品"></el-option>
                            <el-option label="烟酒" value="烟酒"></el-option>
                            <el-option label="食品" value="食品"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="关键字:" prop="keychar" width="30%">
                        <el-input type="text" v-model="searchForm.keychar" autocomplete="off" placeholder="商品名称、条形码"></el-input>
                    </el-form-item>

                    <el-button type="primary" @click="getsearch" class="btn1">查询</el-button>
                    
                </el-form>
            </div>
            <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            @selection-change="handleSelectionChange"
            style="width: 110%">
                <el-table-column
                type="selection"
                width="35">
                </el-table-column>

                <el-table-column
                prop="procode"
                label="商品条形码"
                width="140">
                </el-table-column>

                <el-table-column
                prop="proname"
                label="商品名称"
                width="150">
                </el-table-column>

                <el-table-column
                prop="region"
                label="所属分类"
                width="130"
                >
                </el-table-column>

                <el-table-column
                prop="prosale"
                label="售价(元)"
                width="110"
                >
                </el-table-column>

                <el-table-column
                prop="promotionprice"
                label="促销价(元)"
                width="110"
                >
                </el-table-column>
                <el-table-column
                prop="marketprice"
                label="市场价(元)"
                width="110"
                >
                </el-table-column>

                <el-table-column
                prop="repertory"
                label="库存"
                width="110"
                >
                </el-table-column>

                <el-table-column
                prop="repertorysum"
                label="库存总额"
                width="110"
                >
                </el-table-column>

                <el-table-column
                prop="salesum"
                label="销售总额"
                width="110"
                >
                </el-table-column>

                <el-table-column
                prop="manage"
                label="管理"
                width="80"
                >
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row.id)" type="primary"><i class="el-icon-edit"></i></el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)"><i class="el-icon-delete"></i></el-button>


                        <el-dialog title="修改用户" :visible.sync="dialogFormVisible" width="30%">
                            <el-form 
                            :model="form" 
                            :rules="rules2" 
                            ref="form" 
                            label-width="100px" 
                            size="mini"
                            >
                            <el-form-item label="所属分类" prop="region">
                            <el-select v-model="form.region" placeholder="----选择分类----">
                                <el-option label="家电" value="家电" selected="selected"></el-option>
                                <el-option label="生活用品" value="生活用品"></el-option>
                                <el-option label="烟酒" value="烟酒"></el-option>
                                <el-option label="食品" value="食品"></el-option>
                            </el-select>
                            </el-form-item>

                            <el-form-item label="商品名称" prop="proname">
                                <el-input type="text" v-model="form.proname" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="商品售价" prop="prosale">
                                <el-input type="text" v-model="form.prosale" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="市场价" prop="marketprice">
                                <el-input type="text" v-model="form.marketprice" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="促销价" prop="promotionprice">
                                <el-input type="text" v-model="form.promotionprice" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="库存" prop="repertory">
                                <el-input type="text" v-model="form.repertory" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="库存总额" prop="repertorysum">
                                <el-input type="text" v-model="form.repertorysum" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="销售总额" prop="salesum">
                                <el-input type="text" v-model="form.salesum" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="submitForm('form')">修改</el-button>
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                        </div>
                        </el-dialog>
                    </template>
                </el-table-column>
        </el-table>
        <!-- 批量删除 -->
        <div style="margin-top: 20px" class="btn">
            <el-button type="danger" @click="batchRemove">批量删除</el-button>
            <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
        </div>
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
        </div>
    </div>
</template>

<script>
export default {
    data() {
        // 自定义验证规则
        // 验证价格是否为数字
        let checksale = (rule, value, callback) => {
            var reg = /^(-?\d+)(\.\d+)?$/;
            if (!reg.test(value)) {
                callback(new Error('请输入数字'));
            }else{
                callback();
            }
        };

        // // 验证非必选项
        // let noMustoption = (rule, value, callback) => {
        //   let reg = /^[A-Za-z0-9]+$/;
        //   if(value!=''){
        //     if(!reg.test(value)){
        //       callback(new Error('老实点,要么不填,要么填规矩点'));
        //     }else{
        //       callback();
        //     }
        //   }else{
        //     callback();
        //   }
        // };
        return {
            // prop属性定义的规则
            rules2: {
                proname:[
                    { required: true,message:"请输入商品名称", trigger: 'blur' }
                ],
                prosale:[
                    { required: true,validator: checksale, trigger: 'blur' }
                ],
                region:[
                    {required: true, message: '请选择用户组', trigger: 'change'}
                ],
                marketprice:[
                    { required: true,validator: checksale, trigger: 'blur' }
                ],
                promotionprice:[
                    { required: true,validator: checksale, trigger: 'blur' }
                ],
                repertory:[
                    { required: true,validator: checksale, trigger: 'blur' }
                ],
                repertorysum:[
                    { required: true,validator: checksale, trigger: 'blur' }
                ],
                salesum:[
                    { required: true,validator: checksale, trigger: 'blur' }
                ],
            },
            formLabelWidth: '70px',
            // 显示列表
            tableData: [
                {
                    procode: '',
                    proname: '',
                    region: '',
                    prosale:0,
                    promotionprice:0,
                    marketprice:0,
                    repertory:0,
                    repertorysum:0,
                    salesum:0
                },
            ],
            // 修改列表
            form: {
                    id:0,
                    proname: '',
                    region: '',
                    prosale:0,
                    promotionprice:0,
                    marketprice:0,
                    repertory:0,
                    repertorysum:0,
                    salesum:0
                },
            dialogFormVisible: false,
            // 分页数据
            currentPage:1,
            pageSize:5,
            total:0,
            // 批量删除数据id
            dataId:[],

            // 搜索栏
            searchForm:{
                region:'',
                keychar:''
            }
        }
    },
    methods:{
        // 获取列表数据
        getGoodsList(){
            // 获取数据
            let params = {
                currentPage : this.currentPage,
                pageSize : this.pageSize,
                region:this.searchForm.region,
                keychar:this.searchForm.keychar
            }
            console.log(params)
            this.req.post("/goods/goodslist",params)
            .then(res => {
                let {total,data} = res
                if(data.length === 0 && this.currentPage>0){
                    params.currentPage -= 1
                    this.req.post("/goods/goodslist",params)
                            .then(res => {
                                let {total,data} = res
                                this.tableData = data
                                this.total = total;
                            })
                            .catch(err => {
                                console.log(err);
                            })
                }
                this.tableData = data
                this.total = total;
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 页面条数变化触发
        handleSizeChange(val) {
            this.pageSize = val;
            this.getGoodsList()
        },
        // 页码变化触发
        handleCurrentChange(val) {
            this.currentPage = val;
           this.getGoodsList()
        },
        // 删除数据
        handleDelete(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.req.get("/goods/goodsdel",{id})
                        .then(res => {
                            // 接收数据
                            let {code,reason} = res;
                            if(code === 0){
                                this.$message({
                                    type:'success',
                                    message:reason
                                })
                                this.getGoodsList();
                            }else if(code === 1){
                                this.$message({
                                    type:'error',
                                    message:reason
                                })
                            }
                        })
                        .catch(err => {
                            console.log(res);
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            
        },
        // 修改界面取消选择
        toggleSelection() {
          this.$refs.multipleTable.clearSelection();
        },
        // 修改数据
        handleEdit(id){
            this.dialogFormVisible = true
            this.form.id = id
            // 请求数据
            this.req.post("/goods/goodsedit",{id})
                .then(res => {
                    this.form = res[0];
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 保存修改数据
        submitForm(formName) {
            // 收集数据
            let params = {
                region:this.form.region,
                proname: this.form.proname,
                prosale: this.form.prosale,
                marketprice:this.form.marketprice,
                promotionprice:this.form.promotionprice,
                repertory:this.form.repertory,
                repertorysum:this.form.repertorysum,
                salesum:this.form.salesum,
                id:this.form.id
            };
            this.$refs[formName].validate((valid) => {
            if (valid) {
                
                // 发送添加商品请求
                this.req.post("/goods/goodseditsave",params)
                    .then(res => {
                        this.$message({
                            message: '商品修改成功',
                            type: 'success',
                            center:true
                        });
                    this.dialogFormVisible = false
                    this.getGoodsList()
                    })
                    .catch(err => {
                    console.log(err);
                    })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        // 取消批量删除
        toggleSelection() {
            this.$refs.multipleTable.clearSelection();
        },
        // 获取多条数据id
        handleSelectionChange(val) {
            // 获取选中的ID
            this.dataId = val.map(v => v.id);
        },
        // 批量删除
        batchRemove(){
            // 收集数据
            let id = this.dataId;
            if(id.length > 0){
                // 发送删除批量请求
                this.req.get("/goods/batchremove",{id})
                    .then(res => {
                        // 接收数据 
                        let {code,reason} = res;
                        if(code === 0){
                            this.$message({
                                type:'success',
                                center:true,
                                message:reason
                            })
                            this.getGoodsList();
                        }else if(code === 1){
                            this.$message({
                                type:'error',
                                center:true,
                                message:reason
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            

            // if(!this.dataId.length){
            //   return false;
            // }
            //   this.$confirm('想好了再删!', '提示', {
            //       confirmButtonText: '确定',
            //       cancelButtonText: '取消',
            //       type: 'warning'
            //   }).then(() => {
            //       this.req.get("/account/batchremove",this.dataId)
            //           .then(res => {
            //               let {code, reason} = res;
            //               if(code === 0){
            //                 this.$message({
            //                   type:'success',
            //                   message:reason
            //                 })
            //               this.pageData();
            //             }else if(code === 1){
            //               this.$message({
            //                 type:'eroor',
            //                 message:'reason'
            //               })
            //             }
            //           })
            //           .catch(err => {
            //             console.log(err)
            //           })
            //   }).catch(() => {
            //       this.$message({
            //         type: 'info',
            //         message: '已取消删除'
            //       });          
            // });
        },
        // 获取搜索栏的值
        getsearch(){
            // 调用分页函数
            this.getGoodsList();


            // 收集数据
            // let params = {
            //     region:this.searchForm.region,
            //     keychar:this.searchForm.keychar
            // }
            // this.req.get("/goods/getsearch",params)
            //     .then(res => {
            //         this.tableData = res;
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })
            // }
    }    },
    //生命周期用于刷新列表
    created(){
        this.getGoodsList()
    }
}
</script>

<style lang="less">
@import "./goodsmanage.less";
</style>
