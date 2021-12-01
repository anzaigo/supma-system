<template>
    <div class="home">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>系统信息</span>
            </div>
            <!-- 提示信息 -->
            <div class="tips">
                <el-alert title="商品总数：5。已经销售的总金额：890.00。库存商品总价：1235.82" type="info" show-icon></el-alert>
                <el-alert title="导入数据" type="success" show-icon></el-alert>
            </div>
            <el-row :gutter="40">
                <!-- 左侧卡片 -->
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>销售排行</span>
                        </div>
                        <!-- 左侧表格 -->
                        <el-table :data="salesData" style="width: 100%">
                            <el-table-column prop="name" label="商品名称" width="350"></el-table-column>
                            <el-table-column prop="num" label="销量" ></el-table-column>
                        </el-table>
                    </el-card>
                </el-col>
                <!-- 右侧卡片 -->
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>缺货的商品</span>
                        </div>
                        <!-- 右侧表格 -->
                            <el-table :data="stockData" style="width: 100%">
                                <el-table-column prop="name" label="商品名称" width="350"></el-table-column>
                                <el-table-column prop="num" label="库存" ></el-table-column>
                            </el-table>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
          salesData: [{
            name: '海飞丝',
            num: '12'
          }, {
            name: '茅台酒',
            num: '18'
          }, {
            name: '五粮液',
            num: '55'
          }, {
            name: '喜糖',
            num: '66'
          }],
          stockData: [{
            name: '我的优乐美',
            num: '12'
          }, {
            name: '你的伊利',
            num: '18'
          }]
        }
    }
    
}
</script>
<style lang="less">
.home{
    line-height: 0;
    // 面板组件样式
    .el-card{
        border-radius: 10px;
        // 面板组件头部样式
        .el-card__header{
            text-align: left;
            font-size: 18px;
            font-weight: 600;
            background-color: #f1f1f1;
            height: 45px;
            line-height: 10px;
        }
        // 面板组件内容样式
        .el-card__body{
            // 提示内容样式
            .tips{
                margin-bottom: 20px;
                .el-alert{
                     height: 40px;
                }
                .el-alert--info{
                    margin-bottom: 20px;
                    // 图标颜色
                    .el-alert__icon{
                        color: rgb(26, 49, 252);
                    }
                }
            }
        }
    }
}
</style>