<template>
    <div class="account-add">
        <!-- 标题 -->
        <el-card class="box-card" body-style="height:100%;">
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
        </el-card>

        <!-- 添加 -->
        <div class="register">
            <div class="login-warper">
            <!-- 表单验证 -->
            <el-form 
            :model="regisForm" 
            status-icon 
            :rules="rules" 
            ref="regisForm" 
            label-width="100px" 
            >
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="regisForm.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="regisForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input type="password" v-model="regisForm.checkPwd" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="权限" prop="region">
                  <el-select v-model="regisForm.region" placeholder="选择用户组">
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('regisForm')">提交</el-button>
                    <el-button @click="resetForm('regisForm')">重置</el-button>
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
        // 验证密码
        var passwordRule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value.length < 3 || value.length > 5){
            callback(new Error('密码长度3-5位'));
        }else{
          if (this.regisForm.checkPass !== '') {
            this.$refs.regisForm.validateField('checkPwd');
          }
          // 验证成功后调用回调函数
          callback();
        }
      };
      // 验证确认密码
       var checkPassRule = (rule, value, callback) => {
           if(value === ''){
               callback(new Error('请再次输入密码'));
           }else if(this.regisForm.password !== this.regisForm.checkPwd){
               callback(new Error('两次密码输入不一致'));
           }else{
               callback();
           }
       }
        

      // input框的值
      return {
        regisForm: {
          username: '',
          password: '',
          checkPwd: '',
          region:'',
        },
        // prop属性定义的规则
        rules: {
            username:[
                { required: true, message: '请输入账户', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password:[
                // { required: true, message: '请输入密码', trigger: 'blur' }
                { required: true,validator: passwordRule, trigger: 'blur' }
            ],
            checkPwd:[
                // { required: true, message: '请再次输入密码', trigger: 'blur' }
                { required: true,validator: checkPassRule, trigger: 'blur' }
            ],
            region:[
              {required: true, message: '请选择用户组', trigger: 'change'}
            ]
             
        },
      };
    },
    methods: {
      // 提交按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
                    message: '用户添加成功',
                    type: 'success',
                    center:true
                });
            // 整理发送的数据
            const  params = {
                username:this.regisForm.username,
                password:this.regisForm.password,
                region:this.regisForm.region
            }
            // post发送请求数据
            this.req.post("/account/accountadd",params)
            .then((res) => {
                // 跳转到后端首页
                this.$router.push("/index/accountmanage")
            })
            .catch((err) => {
                console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重置按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="less">
@import "./accountAdd.less";
</style>
