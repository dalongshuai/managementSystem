<template>
    <div class="person-center">
        <el-upload
        ref="upload"
        class="avatar-uploader"
        action="http://127.0.0.1:2888/account/uploadavatar"
        :http-request="submit2"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>


<script>
import axios from "axios"
export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      // 上传成功回显
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        let {code,reason} = res;
        if(code === 0){
          this.$message({
              type:'success',
              message:reason
          })
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submit2(file){
        let fd = new FormData() // 浏览器对象 主要用于上传
        fd.append('file',file.file);

        // 获取token
        const token = window.localStorage.getItem("token");
        
        // 发送请求
        axios.post('/account/uploadavatar', 
                fd,
                { headers: { 'Content-Type': 'multipart/form-data', 'authorization': `Bearer ${token}`} 
            })
                .then(response => {
                    let { code, reason, imgurl } = response.data;
                    if (code === 0) {
                        // 回填头像
                        this.imageUrl = `http://127.0.0.1:2888${imgurl}`;
                        // 成功提示
                        this.$message({
                            type: 'success',
                            message: reason
                        })

                        // 触发父组件方法
                        this.$emit('updateAvatar')

                    } else if (code === 1) {
                        // 弹失败信息
                        this.$message({
                          type:'success',
                          message:reason
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })

      
      
      
      
      
      }
    }
}
</script>

<style lang="less">
@import "./personCenter.less";
</style>
