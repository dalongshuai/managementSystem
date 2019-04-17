<template>
    <div class="login">
        <div class="login-warper">
            <!-- 登录标题 -->
            <h2>
                <i class="iconfont icon-xitong"></i>
                欢迎登录华联超市管理系统
            </h2>
            
            <!-- 表单验证 -->
            <el-form 
            :model="myForm" 
            status-icon 
            :rules="rules" 
            ref="myForm" 
            label-width="150px" 
            >
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="myForm.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="myForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input type="password" v-model="myForm.checkPwd" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('myForm')">提交</el-button>
                    <el-button @click="resetForm('myForm')">重置</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        // 自定义验证规则
        var passwordRule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));

        } else if(value.length < 3 || value.length > 5){
            callback(new Error('密码长度3-5位'));
        }else{
          if (this.myForm.checkPass !== '') {
            this.$refs.myForm.validateField('checkPwd');
          }
          // 验证成功后调用回调函数
          callback();
        }
      };

       var checkPassRule = (rule, value, callback) => {
           if(value === ''){
               callback(new Error('请再次输入密码'));
           }else if(this.myForm.password !== this.myForm.checkPwd){
               callback(new Error('两次密码输入不一致'));
           }else{
               callback();
           }
       }
        

      // input框的值
      return {
        myForm: {
          username: '',
          password: '',
          checkPwd: ''
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
            ]
             
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            // 整理数据
            let params = {
              username:this.myForm.username,
              password:this.myForm.password
            }
            // 发送请求
            this.req.post("/account/login",params)
                .then(res => {
                  // 接收数据
                  let {code,reason,token} = res;
                  if(code === 0){
                    this.$message({
                      type:'success',
                      message:reason
                    })
                    // 把token写入本地local storage
                    window.localStorage.setItem("token",token);
                    // 跳转到后端首页
                    this.$router.push("./index")
                  }else if(code === 1){
                    this.$message({
                      type:'error',
                      message:reason
                    })
                  }
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="less">
@import "./login.less";
</style>
