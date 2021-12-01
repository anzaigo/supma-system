<template>
    <div class="accountmanage">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>系统信息</span>
            </div>
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >

                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>

                <!-- 账号 -->
                <el-table-column
                    prop="username"
                    label="账号"
                    >
                </el-table-column>

                <!-- 用户组 -->
                <el-table-column
                    prop="userGroup"
                    label="用户组"
                    >
                </el-table-column>

                <!-- 创建日期 -->
                <el-table-column
                    label="创建日期"
                    >
                    <template slot-scope="scope">
                        {{ scope.row.cdata }}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">
                            <i class="el-icon-edit"></i>
                            <span class="interval">编辑</span>
                        </el-button>
                        
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">
                            <i class="el-icon-delete"></i>
                            <span class="interval">删除</span>
                        </el-button>
                </template>
    </el-table-column>
               
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tableData: [
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'},
                {username: 'anzai', userGroup: '普通用户', cdata: '2121-11-26'}
            ]
        }
    },
    methods: {
        handleSelectionChange () {},
        handleEdit () {},
        handleDelete () {}
    }
}
</script>
<style lang="less">
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
        .el-card__body{
            .el-table{
                .el-table__header-wrapper{
                    padding-left: 4px;
                    // height: 80px;
                    line-height: 30px;
                }
            }
        }
    }
</style>