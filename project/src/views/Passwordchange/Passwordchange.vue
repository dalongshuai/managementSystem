<template>
    <div class="password-change">
         <!-- 标题 -->
        <el-card class="box-card" body-style="height:100%;">
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
        </el-card>

        <!-- 修改密码 -->
        <div class="login-warper">
            <!-- 表单验证 -->
            <el-form 
            :model="changeForm" 
            status-icon 
            :rules="rules" 
            ref="changeForm" 
            label-width="80px" 
            >
                <el-form-item label="原密码" prop="oldpassword">
                    <el-input type="text" v-model="changeForm.oldpassword"></el-input>
                </el-form-item>

                <el-form-item label="新密码" prop="newpassword">
                    <el-input type="password" v-model="changeForm.newpassword" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input type="password" v-model="changeForm.checkPwd" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('changeForm')">提交</el-button>
                    <el-button @click="resetForm('changeForm')">重置</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        // 自定义验证规则
        // 定义密码规则
        var passwordRule = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));

          } else if(value.length < 3 || value.length > 5){
              callback(new Error('密码长度3-5位'));
          }else{
            if(value === this.changeForm.oldpassword){
              callback(new Error("新密码与原密码相同!"))
            }
            if (this.changeForm.checkPass !== '') {
              this.$refs.changeForm.validateField('checkPwd');
            }
            // 验证成功后调用回调函数
            callback();
          }
        };
        // 确认密码规则
        var checkPassRule = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('请再次输入密码'));
            }else if(this.changeForm.newpassword !== this.changeForm.checkPwd){
                callback(new Error('两次密码输入不一致'));
            }else{
                callback();
            }
            
        }
        // 验证旧密码
        var checkOldPwd = (rule,value,callback) => {
            // 发送请求
            this.req.post("/account/checkoldpassword",{value})
                .then(res => {
                  // 接收数据
                  if(res.code !== 0){
                    callback(new Error("原密码错误!"))
                  }else{
                    callback();
                  }
                })
                .catch(err => {
                  console.log(err);
                })
        }
        

      // input框的值
      return {
        changeForm: {
          oldpassword: '',
          newpassword: '',
          checkPwd: ''
        },
        // prop属性定义的规则
        rules: {
            oldpassword:[
                { required: true, validator: checkOldPwd, trigger: 'blur' },
            ],
            newpassword:[
                { required: true,validator: passwordRule, trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            checkPwd:[
                { required: true,validator: checkPassRule, trigger: 'blur' }
            ]
             
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                let newpassword = this.changeForm.newpassword
                // 发送请求
                this.req.post("/account/savachangepassword",{newpassword})
                    .then(res => {
                      // 接收数据
                      let {code,reason} = res;
                      if(code === 0){
                        this.$message({
                          type:'success',
                          center:true,
                          message:reason
                        })
                        // 清除token
                        window.localStorage.removeItem("token");
                        setTimeout(()=>{
                          this.$router.push("/login")
                        },1000)
                        
                      }else if(code === 1){
                        this.$message({
                          type:"error",
                          center:true,
                          message:reason
                        })
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    })

                // this.$message({
                //     showClose: true,
                //     message: '密码修改成功',
                //     type: 'success',
                //     center:true
                // });


            // // 跳转到后端首页
            // this.$router.push("/index/accountmanage")
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="less">
@import "./passwordChange.less";
</style>
