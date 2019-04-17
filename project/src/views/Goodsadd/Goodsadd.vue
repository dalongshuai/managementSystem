<template>
    <div class="goods-add">
        <!-- 标题 -->
        <el-card class="box-card" body-style="height:100%;">
            <div slot="header" class="clearfix">
                <span>添加商品</span>
            </div>
            <p>你可以在这里添加商品</p>
        </el-card>

        <!-- 商品添加 -->
         <div class="goodsadd">
            <div class="login-warper">
            <!-- 表单验证 -->
            <el-form 
            :model="stockForm" 
            status-icon 
            :rules="rules" 
            ref="stockForm" 
            label-width="100px" 
            size="mini"
            >
                <el-form-item label="所属分类" prop="region">
                  <el-select v-model="stockForm.region" placeholder="----选择分类----">
                    <el-option label="家电" value="家电"></el-option>
                    <el-option label="生活用品" value="生活用品"></el-option>
                    <el-option label="烟酒" value="烟酒"></el-option>
                    <el-option label="食品" value="食品"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="商品条形码" prop="procode">
                    <el-input type="text" v-model="stockForm.procode" disabled></el-input>
                    <el-button type="primary" @click="code">生成条形码</el-button>
                </el-form-item>

                <el-form-item label="商品名称" prop="proname">
                    <el-input type="text" v-model="stockForm.proname" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="商品售价" prop="prosale">
                    <el-input type="text" v-model="stockForm.prosale" @input="newsale" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="市场价" prop="marketprice">
                    <el-input type="text" v-model="stockForm.marketprice" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="商品进价" prop="inprice">
                    <el-input type="text" v-model="stockForm.inprice" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="入库数量" prop="innum">
                    <el-input type="text" v-model="stockForm.innum" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="商品重量" prop="proweight">
                    <el-input type="text" v-model="stockForm.proweight" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="商品单位" prop="prounit">
                    <el-input type="text" v-model="stockForm.prounit" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('stockForm')">添加</el-button>
                    <el-button type="primary" @click="resetForm('stockForm')">重置</el-button>
                </el-form-item>

            </el-form>
        </div>
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

        // 验证非必选项
        let noMustoption = (rule, value, callback) => {
          let reg = /^(-?\d+)(\.\d+)?$/;
          if(value!=''){
            if(!reg.test(value)){
              callback(new Error('老实点,要么不填,要么填规矩点'));
            }else{
              callback();
            }
          }else{
            callback();
          }
        };
        
      // input框的值
      return {
        stockForm: {
            region:'',
            procode: '',
            proname: '',
            prosale: '',
            marketprice: '',
            inprice:'',
            innum:'',
            proweight:'',
            prounit:''
        },
        // prop属性定义的规则
        rules: {
            procode:[
                { required: true, message: '请输入条形码', trigger: 'blur' },
            ],
            proname:[
                { required: true,message:"请输入商品名称", trigger: 'blur' }
            ],
            prosale:[
                { required: true,validator: checksale, trigger: 'blur' }
            ],
            region:[
              {required: true, message: '请选择用户组', trigger: 'blur'}
            ],
            
            inprice:[
              {required: false,validator: noMustoption, trigger: 'blur'}
            ],
            innum:[
              {required: false,validator: noMustoption, trigger: 'blur'}
            ],
            proweight:[
              {required: false,validator: noMustoption, trigger: 'blur'}
            ],
            prounit:[
              {required: false,validator: noMustoption, trigger: 'blur'}
            ],
            
        },
      };
    },
    methods: {
      submitForm(formName) {
        // 收集数据
        let params = {
            region:this.stockForm.region,
            procode: this.stockForm.procode,
            proname: this.stockForm.proname,
            prosale: this.stockForm.prosale,
            marketprice:this.stockForm.marketprice,
            inprice:this.stockForm.inprice,
            innum:this.stockForm.innum,
            proweight:this.stockForm.proweight,
            prounit:this.stockForm.prounit
        };
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
                    showClose: true,
                    message: '商品添加成功',
                    type: 'success',
                    center:true
                });
            // 发送添加商品请求
            this.req.post("/goods/goodsadd",params)
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log(err);
                })
            // 跳转到后端首页
            this.$router.push("/index/goodsmanage")
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重置按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 市场价
      newsale(){
        if(this.stockForm.prosale!=''){
          this.stockForm.marketprice = (parseFloat(this.stockForm.prosale)*1.2).toFixed(2); 
        }else{
          this.stockForm.marketprice='';
        }
      },
      code(){
        let date = new Date();
        date = date.toLocaleString()
        let strDate = '';
        let reg = /^[0-9]$/
        for(let i=0; i<date.length; i++){
          if(reg.test(date[i])){
            strDate += date[i];
          }
        }
        this.stockForm.procode = strDate;
      }
    }
}
</script>

<style lang="less">
@import "./goodsAdd.less";
</style>
