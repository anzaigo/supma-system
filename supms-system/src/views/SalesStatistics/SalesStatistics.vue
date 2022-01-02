<template>
    <div class="salesstatistics">
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>销售统计</span>
            </div>
            <!-- 面板内容 -->
            <div class="text item">
                <!-- 报表容器 -->
                <div id="main" style="height:400px"></div>
            </div>
        </el-card>
    </div>
</template>
<script>
// 引入echarts
import * as echarts from "echarts";
export default {
    // 这个生命周期可以获取dom
    mounted () {
        // 基于准备好的dom，初始化echarts图表
        var myChart = echarts.init(document.getElementById('main'));
        // 配置对象 （关键就是发送ajax请求 获取到后端数据 使用后端数据 来修改这份配置）
        var option = {
            tooltip: {
                show: true
            },
            legend: {
                data:['销量']
            },
            xAxis : [
                {
                    type : 'category',
                    data : ["1月","2月","3月","4月","5月","6月", "7月"]
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    "name":"销量",
                    "type":"line",
                    "data":[] // 没有数据
                }
            ]
        }
        // 为echarts对象加载数据 
        myChart.setOption(option);  

        // 发送ajax给后端 获取到一份销量数据
        let sales = [100, 50, 160, 38, 56, 99, 10];
        myChart.setOption({  // 发送请求到后端获取数据 只需要重新 setOption 即可。
             series : [
                {
                    "name":"销量",
                    "data":sales
                }
            ]
        })
    },
}
</script>
<style lang="less">
.salesstatistics{
    // 面板组件
    .el-card{
        border-radius: 10px;
        // 面板组件头部
        .el-card__header{
            text-align: left;
            font-size: 18px;
            font-weight: 600;
            background-color: #f1f1f1;
            height: 45px;
            line-height: 10px;
        }
        // 面板组件内容
        // .el-card__body{
        // }
    }
}
</style>