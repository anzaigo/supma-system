<template>
    <div class="classifymanage">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>分类管理</span>
            </div>

            <!-- 搜索框 -->
            <div class="search-wrapper">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" >
                    <el-form-item label="所属分类">
                        <el-select v-model="searchForm.cateName" placeholder="所属分类">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="糖果" value="糖果"></el-option>
                            <el-option label="饼干" value="饼干"></el-option>
                            <el-option label="饮料" value="饮料"></el-option>
                            <el-option label="面包" value="面包"></el-option>
                            <el-option label="牛奶" value="牛奶"></el-option>
                            <el-option label="熟食" value="熟食"></el-option>
                            <el-option label="蔬菜" value="蔬菜"></el-option>
                            <el-option label="肉类" value="肉类"></el-option>
                            <el-option label="麦片" value="麦片"></el-option>
                            <el-option label="学习用具" value="学习用具"></el-option>
                            <el-option label="生活用品" value="生活用品"></el-option>
                            <el-option label="家具" value="家具"></el-option>
                            <el-option label="电器" value="电器"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字">
                        <el-input v-model="searchForm.keyWord" placeholder="关键字或条形码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <!-- 面板内容 -->
            <el-table
                ref="multipleTable"
                :data="goodsTableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
                <!-- 选择按钮 -->
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>

                <!-- 商品名称 -->
                <el-table-column
                    prop="goodsName"
                    label="商品名称"
                    >
                </el-table-column>

                <!-- 所属分类 -->
                <el-table-column
                    prop="cateName"
                    label="所属分类"
                    >
                </el-table-column>

                <!-- 商品条形码 -->
                <el-table-column
                    prop="barCode"
                    label="商品条形码"
                    >
                </el-table-column>

                <!-- 创建日期 -->
                <el-table-column
                    label="创建日期"
                    >
                    <template slot-scope="scope">
                        {{ scope.row.ctime | filterCtime}}
                    </template>
                </el-table-column>

                <!-- 操作 -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.row.id)"
                            type="primary">
                            编辑
                            <i class="el-icon-edit"></i>
                        </el-button>
                    </template>
                </el-table-column>
               
            </el-table>
            
            <!-- 分页显示 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[2, 4, 6, 8]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>

            <!-- 编辑弹出的模态框 -->
            <el-dialog title="编辑分类" :visible.sync="flag" label-width="100px">
                <!-- 回填表单 -->
                <el-form :model="editForm" :rules="rules">
                    <!-- 所属分类 -->
                    <el-form-item label="所属分类" :label-width="formLabelWidth" prop="cateName">
                        <el-select v-model="editForm.cateName" placeholder="所属分类">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="糖果" value="糖果"></el-option>
                            <el-option label="饼干" value="饼干"></el-option>
                            <el-option label="饮料" value="饮料"></el-option>
                            <el-option label="面包" value="面包"></el-option>
                            <el-option label="牛奶" value="牛奶"></el-option>
                            <el-option label="熟食" value="熟食"></el-option>
                            <el-option label="蔬菜" value="蔬菜"></el-option>
                            <el-option label="肉类" value="肉类"></el-option>
                            <el-option label="麦片" value="麦片"></el-option>
                            <el-option label="学习用具" value="学习用具"></el-option>
                            <el-option label="生活用品" value="生活用品"></el-option>
                            <el-option label="家具" value="家具"></el-option>
                            <el-option label="电器" value="电器"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <!-- 表单尾部 -->
                <div slot="footer" class="dialog-footer">
                    <el-button @click="flag = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
// 引用moment
const moment = require('moment');

export default {
    data () {
        return {
            searchForm: {                 // 查询内容（搜索框）
                keyWord: '',              // 查询关键字
                cateName: '全部'          // 默认值
            },
            goodsTableData: [],           // 用户账号表格数据
            editForm: {                   // 编辑表单分类回填
                cateName: ''
            },
            flag: false,                  // 控制修改模态框的显示和隐藏
            formLabelWidth: '120px',      // label的宽度
            editId: '',                   // 用来保存被编辑数据的id
            selectedAccount: [],          // 保存被多选删除数据的id
            currentPage: 1,               // 当前页-默认值
            total: 0,                     // 数据总条数-默认值
            pageSize: 4,                  // 每页显示的数据条数-默认值
            rules: {                      // 表单验证规则
            }
        }
    },
    // 生命周期的钩子函数 created 自动触发 vue组件实例对象创建完成 dom还没有绑定 这个函数里面适合发送ajax请求 获取数据
    created() {
        // 自动发送请求 获取所有分页的用户账号数据 （只要一进入这个组件 就自动发送请求）
        this.getgoodsListByPage();
    },
    methods: {
        // 查询按钮
        search() {
            // 调用分页函数
            this.getgoodsListByPage();
        },
        // 按照分页显示数据的函数
        getgoodsListByPage () {
            // 参数对象
            let params = {
                pageSize: this.pageSize, // 每页条数
                currentPage: this.currentPage, // 当前页码
                cateName: this.searchForm.cateName, // 查询分类名
                keyWord: this.searchForm.keyWord // 查询关键字
            };
            // 发送ajax请求，把每页数据发送给后端
            this.req.get('/goods/goodslistbypage', params)
             .then(response => {
                // 接收后端返回的数据总条数 total 和 对应页码的数据 data
                let {total, data} = response;
                // 赋值给对应的变量
                this.total = total;
                this.goodsTableData = data;
                // 如果当前页没有数据 且 排除第一页
                if(!data.length && this.currentPage !== 1){
                    // 页码减去1
                    this.currentPage -= 1;
                    // 再次调用自己
                    this.getgoodsListByPage();
                }
             })
             .catch(err => {
                 console.log(err);
             })
        },
        // 编辑功能的实现（回填表单）
        handleEdit (id) {
            // 保存被点击的id
            this.editId = id;
            // 发送请求，发送id给后端
            this.req.get(`/goods/classification`, {id})
             .then(response => {
                // 接收后端返回的数据，后端返回的数据即使只有一条 也是数组
                let result = response[0];
                // 回填表单
                this.editForm.cateName = result.cateName;
                // 显示模态框 (回填数据之后)
                this.flag = true;
             })
             .catch(err => {
                 console.log(err);
             })
        },
        // 保存修改(模态框确认按钮)
        saveEdit (){
            // 收集原来数据的id 和 新的表单数据
            let params = {
                editId: this.editId,
                cateName: this.editForm.cateName
            }
            // 发送ajax请求 把新数据和原来的id一起发送给后端
            this.req.post("/goods/goodseditsave", params)
             .then(response => {
                 console.log(response);
                // 接收错误码和提示信息
                let { error_code, reason } = response;
                if (error_code === 0) {
                    // 弹出成功的提示
                    this.$message({
                    type: "success",
                    message: reason
                    });
                    // 刷新列表（重新请求所有账号数据）
                    this.getgoodsListByPage();
                } else {
                    // 弹出失败的提示
                    this.$message.error(reason);
                }
                // 关闭模态框
                this.flag = false;
             })
             .catch(err => {
                 console.log(err)
             })
        },
        // 当单选框的选中状态改变 就会触发这个函数 val就是选中的数据 是一个数组 数组里面是数据对象
        handleSelectionChange (val) {
            // 保存被选中的状态
            this.selectedAccount = val;
        },
        // 每页显示数据的条数改变 就会触发这个函数
        handleSizeChange (val) {
            // 保存显示每页数据显示的条数
            this.pageSize = val;
            // 调用分页函数
            this.getgoodsListByPage();
        },
        // 当前页码改变 就会触发这个函数
        handleCurrentChange (val) {
            // 保存当前页码
            this.currentPage = val;
            // 调用分页函数
            this.getgoodsListByPage();
        }
    },
    filters: {
        // 过滤时间函数
        filterCtime(ctime) {
            return moment(ctime).format("YYYY/MM/DD HH:mm:ss");
        }
    }
}
</script>
<style lang="less">
.classifymanage{
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
            // 分页显示样式
            .el-pagination{
                height: 28px;
                margin: 20px 0;
                .el-pager{
                    height: 100%;
                }
            }
            // 模态框
            .el-dialog__wrapper{
                .el-dialog{
                    width: 450px;
                    height: 350px;
                    border-radius: 10px;
                    .el-dialog__header{
                        height: 100px;
                        text-align: center;
                    }
                    .el-dialog__body{
                        padding-bottom: 0px;
                    }
                    .el-dialog__footer{
                        .dialog-footer{
                            height: 100px;
                            line-height: 100px;

                        }
                    }
                }
            }
        }
    }
}
</style>