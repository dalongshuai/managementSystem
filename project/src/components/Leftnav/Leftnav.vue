<template>
    <div class="left-nav">
        <el-aside width="250px" style="background-color: #2f2f2f">
            <div class="title">
                <h3>华联超市管理系统</h3>
                <div class="user">
                    <p>
                        你好,<span>admin</span>
                    </p>
                    <p>
                        <a href="#">管理首页</a>&nbsp;|
                        <a href="#">退出系统</a>
                    </p>
                </div>
            </div>
            <el-menu 
            :default-active="$route.path"
            unique-opened 
            router
            >

            <!-- 商品管理 -->
            <el-submenu v-for="(item,index) in menuData" :key="index" :index="index+1+''">
                <template slot="title"><i :class="item.icon"></i>&nbsp;&nbsp;{{item.title}}</template>
                <el-menu-item-group v-for="(item,index) in item.childMenu" :key="index">
                    <el-menu-item :index="item.childPath">{{item.childTitle}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <!-- 进货管理 -->
            <!-- <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>进货管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/index/Stockmanage">库存管理</el-menu-item>
                    <el-menu-item index="/index/Stockadd">添加库存</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->

            <!-- 出货管理 -->
            <!-- <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>出货管理</template>
                <el-menu-item-group>
                    <el-menu-item index="3-1">销售列表</el-menu-item>
                    <el-menu-item index="3-2">商品出库</el-menu-item>
                    <el-menu-item index="3-3">商品退货</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->

            <!-- 统计管理 -->
            <!-- <el-submenu index="4">
                <template slot="title"><i class="el-icon-setting"></i>统计管理</template>
                <el-menu-item-group>
                    <el-menu-item index="4-1">销售统计</el-menu-item>
                    <el-menu-item index="4-2">进货统计</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->

            <!-- 账号管理 -->
            <!-- <el-submenu index="5">
                <template slot="title"><i class="el-icon-setting"></i>账号管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/index/accountmanage">账号管理</el-menu-item>
                    <el-menu-item index="/index/accountadd">账号添加</el-menu-item>
                    <el-menu-item index="/index/passwordchange">密码修改</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->

            <!-- 系统管理 -->
            <!-- <el-submenu index="6">
                <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/index">系统信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->

            </el-menu>
        </el-aside>
    </div>
    
</template>

<script>
export default {
    data(){
        return {
            menuData:[
                // 商品管理
                {
                    roles:["admin","normal"],
                    icon:"iconfont icon-shangpinguanli",
                    title:"商品管理",
                    childMenu:[
                        {
                            childPath:"/index/goodsmanage",
                            childTitle:"商品管理",
                        },
                        {
                            childPath:"/index/goodsadd",
                            childTitle:"商品添加"
                        }  
                    ]
                },
                // 进货管理
                {
                    roles:["admin","normal"],
                    icon:"iconfont icon-chukuguanli-",
                    title:"进货管理",
                    childMenu:[
                        {
                            childPath:"/index/stockmanage",
                            childTitle:"库存管理"
                        },
                        {
                            childPath:"/index/stockadd",
                            childTitle:"库存添加"
                        }  
                    ]
                },
                // 出货管理
                {
                    roles:["admin","normal"],
                    icon:"inconfont icon-shangpinguanli",
                    title:"出货管理",
                    childMenu:[
                        {
                            childPath:"",
                            childTitle:"销售列表"
                        },
                        {
                            childPath:"",
                            childTitle:"商品出库"
                        },  
                        {
                            childPath:"",
                            childTitle:"商品退货"
                        }  
                    ]
                },
                // 统计管理
                {
                    roles:["admin","normal"],
                    icon:"inconfont icon-shangpinguanli",
                    title:"统计管理",
                    childMenu:[
                        {
                            childPath:"/index/salestatis",
                            childTitle:"销售统计"
                        },
                        {
                            childPath:"/index/instatis",
                            childTitle:"进货统计"
                        },  
                    ]
                }, 
                // 账户管理
                {
                    roles:["admin","normal"],
                    icon:"iconfont icon-zhanghuguanli",
                    title:"账号管理",
                    childMenu:[
                        {
                            childPath:"/index/accountmanage",
                            childTitle:"账号管理"
                        },
                        {
                            childPath:"/index/accountadd",
                            childTitle:"账号添加"
                        },  
                        {
                            childPath:"/index/passwordchange",
                            childTitle:"修改密码"
                        },
                        {
                            childPath:"/index/personcenter",
                            childTitle:"个人中心"
                        }  
                    ]
                },
                // 系统管理
                {
                    roles:["admin"],
                    icon:"iconfont icon-xitongxinxi",
                    title:"系统管理",
                    childMenu:[
                        {
                            childPath:"/index/systeminfo",
                            childTitle:"系统信息"
                        }
                    ]
                }
            ]
        }
    },
    methods:{
        // 获取当前用户组
        getRegion(){
            let newData=[];
            this.req.post("/account/getregion",{})
                .then(res => {
                    // 接收数据
                    let roles = res;
                    this.menuData.forEach(item => {
                        roles.forEach(v => {
                            if(item.roles.includes(v)){ // 如果菜单栏的用户权限包含了当前的权限 就放入新数组
                                newData.push(item);
                            }
                        })
                    })
                    this.menuData = newData;
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    created(){
        this.getRegion();
    }
}
</script>

<style lang="less">
@import "./leftnav.less";
</style>
