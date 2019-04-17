<template>
    <div class="right-head" style="clear:both">
        <div class="title">
            <i class="el-icon-menu"></i>
            <span>华联超市管理系统</span>
        </div>
        <div class="user">
            <router-link to="/index/personcenter">
                <img :src="avatarurl" alt="">&emsp;
            </router-link>
            
            <span v-text="username"></span>

            <el-dropdown @command="handleCommand" trigger="click" >
                <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="person">个人中心</el-dropdown-item>
                    <el-dropdown-item command="outlogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import req from "@/api/request.js"
import router from '@/router.js'
export default {
    data(){
        return {
            avatarurl:'',
            username:'123',
            // 退出登录
            handleCommand(command){
                if(command === 'outlogin'){
                    router.push("/login");
                    window.localStorage.removeItem("token");
                }
                if(command === "person"){
                    router.push("/index/personcenter");
                }
            },
            // 获取用户名和头像地址
            getusername(){
                // 发送请求
                req.get("/account/getusername")
                    .then(res => {
                        let { username, avatarurl} = res;
                        this.username = username;
                        console.log(avatarurl)
                        this.avatarurl = `http://127.0.0.1:2888${avatarurl}`
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
        }
    },
    
    methdos:{
        
    },
    created(){
        this.getusername()
    },
}

</script>


<style lang="less">
@import "./rightHead.less";
</style>

