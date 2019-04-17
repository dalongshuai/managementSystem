<template>
    <div class="index">
        <el-container>
            <!-- 左侧固定栏 -->
            <Leftnav></Leftnav>

            <!-- 右侧内容栏 -->
            <el-container>
                <!-- 内容头部 -->
                <el-header>
                    <Righthead ref="rightheader"></Righthead>
                </el-header>

                <!-- 内容主体 -->
                <el-main>
                    <div class="content">

                        <router-view @submit2="upAvatar"></router-view>
                    </div>
                </el-main>

                <!-- 内容底部 -->
                <el-footer>
                    <div class="foot">
                        &copy;copyright&nbsp;2018&nbsp;华联超市管理系统
                    </div>
                </el-footer>
            </el-container>
        </el-container>
       
    </div>
    
</template>

<script>
// 引入左侧导航组件
import Leftnav from "@/components/Leftnav/Leftnav.vue"
import Righthead from "@/components/Righthead/Righthead.vue"
export default {
    components:{
        Leftnav,     // 注册组件
        Righthead
    }, 
    methods:{
        upAvatar(){
            console.log(this.$refs.rightheader.getusername());
        }
    }
}
</script>

<style lang="less">
@import "./index.less";
</style>

