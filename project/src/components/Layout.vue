<template>
    <div class="layout">
        <el-container>
            <!-- 右侧固定栏 -->
            <el-aside width="250px" style="background-color: #2d2d2d">
                <div class="title">
                    <h3>华联超市管理系统</h3>
                    <div class="user">
                        <p>
                            你好,<span>admin</span>
                        </p>
                        <p>
                            <a href="#">管理首页</a>|
                            <a href="#">退出系统</a>
                        </p>
                    </div>
                </div>
                <el-menu :default-openeds="['1', '3']">
                
                <!-- 商品管理 -->
                <el-submenu index="1">
                    <template slot="title"><i class="iconfont icon-shangpinguanli"></i>商品管理</template>
                    <el-menu-item-group>
                    <el-menu-item index="1-1" @click="accountmanege">商品管理</el-menu-item>
                    <el-menu-item index="1-2">添加商品</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!-- 进货管理 -->
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>进货管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">进货管理</el-menu-item>
                        <el-menu-item index="2-2">添加库存</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!-- 出货管理 -->
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>出货管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">销售列表</el-menu-item>
                        <el-menu-item index="3-2">商品出库</el-menu-item>
                        <el-menu-item index="3-3">商品退货</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!-- 统计管理 -->
                <el-submenu index="4">
                    <template slot="title"><i class="el-icon-setting"></i>统计管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">销售统计</el-menu-item>
                        <el-menu-item index="3-2">进货统计</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!-- 账号管理 -->
                <el-submenu index="5">
                    <template slot="title"><i class="el-icon-setting"></i>账号管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">账号管理</el-menu-item>
                        <el-menu-item index="3-2">添加账号</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!-- 系统管理 -->
                <el-submenu index="6">
                    <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">系统信息</el-menu-item>
                        <el-menu-item index="3-2">系统配置</el-menu-item>
                        <el-menu-item index="3-3">权限管理</el-menu-item>
                        <el-menu-item index="3-4">添加管理组</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                </el-menu>
            </el-aside>

            <!-- 左侧内容栏 -->
            <el-container>
                <!-- 内容头部 -->
                <el-header>
                    <div class="head">
                        欢迎您，<span>admin</span>
                    </div>
                </el-header>

                <!-- 内容主体 -->
                <el-main>
                    <div class="content">
                        组件
                    </div>
                </el-main>

                <!-- 内容底部 -->
                <el-footer>
                    <div class="foot">
                        #copyright&nbsp;2018&nbsp;华联超市管理系统
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    methods:{
        accountmanege(){
            alert(1);
            this.$router.push("./accountmanage")
        }
    }
}
</script>

<style lang="less">
.is-active{
    color:black;
}
.layout{
    .title{
        height:240px;
        h3{
            color:rgb(148, 147, 147);
            line-height:60px;
            margin-top: 20px;
        }
        .user{
            height:100px;
            line-height:30px;
            // background-color: #ccc;
            display: flex;
            align-items: flex-end;
            justify-content: space-evenly;
            flex-direction: column;
            padding-right: 43px;
            margin-top: 50px;
            color:#fff;
        }
    }
}
.el-header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    .head{
        display: flex;
        margin-top: 40px;
    }
    .foot{
        line-height:50px;
        font-size: 14px;
        display: flex;
        margin-top: 30px;
        border-top:1px solid #ccc;
    }
  }
  
  .el-aside {
    // background-color: #2d2d2d !important;
    color: #333;
    text-align: center;
    height: 750px;
    background-color: #2d2d2d;
    .el-menu{
        background-color: #2d2d2d;
            .el-submenu{
                margin-bottom: 10px;
                .el-menu-item.is-active{
                    color:black;
                }
                .el-submenu__title{
                    height:30px;
                    line-height:30px;
                    background-color: rgb(11, 206, 86);
                    color:#fff;
                    border-radius: 5px;
                    margin-left: 10px;
                }
            .el-menu--inline{
                .el-menu-item-group{
                    ul{
                        li{
                            text-align: right;
                            height:30px;
                            line-height:30px;
                            color:#ccc;
                            border-radius: 5px;
                            margin-left: 10px;
                        }
                    }
                }
            }    
        }
    }
  }
  
  .el-main {
    background-color: #fff;
    color: #333;
    .content{
        height:99%;
        border:1px solid #ccc;
        border-radius: 5px;
    }
    
    // padding-left: 50px;
    // padding-right: 50px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
    
  }
  .el-container .el-aside {
      height:750px;
  }
</style>

