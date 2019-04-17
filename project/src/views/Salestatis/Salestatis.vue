<template>
    <div class="sale-satais" @click="aaa">
        <!-- 标题 -->
        <el-card class="box-card" body-style="height:100%;">
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
        </el-card>
        <div class="block">
            <span class="demonstration">&emsp;时间:&emsp;</span>
            <el-date-picker
            v-model="value6"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
            </el-date-picker>
        </div>
        <div id="main" style="height:400px"></div>
    </div>
</template>

<script>
import echarts from "echarts"
export default {
    data(){
        return {
            aaa(){
                // console.log(echarts)
            }
        }
        
    },
    methdos:{ 
    },
    // 生命周期钩子函数 dom已经生成 适合操作dom
    mounted () {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '销售统计'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
}
</script>

<style lang="less">
    @import "./saleSatais.less";
    .sale-satais{
        height:100%;
        // #main{
        //     margin-top: 100px;
        // }  
    }
     
</style>


