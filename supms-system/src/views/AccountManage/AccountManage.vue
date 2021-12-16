<template>
    <div class="accountmanage">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>账号管理</span>
            </div>

            <!-- 面板内容 -->
            <el-table
                ref="multipleTable"
                :data="accountTableData"
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
                    prop="usergroup"
                    label="用户组"
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
                            @click="handleEdit(scope.row.id)">
                            <i class="el-icon-edit"></i>
                            <span class="interval">编辑</span>
                        </el-button>
                        
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">
                            <i class="el-icon-delete"></i>
                            <span class="interval">删除</span>
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
            
            <!-- 批量删除 & 删除按钮 -->
            <div class="bcbutton">
                <el-button @click="batchdelete">批量删除</el-button>
                <el-button @click="cancelSelect()">取消选择</el-button>
            </div>
            <!-- 编辑弹出的模态框 -->
            <el-dialog title="编辑账号" :visible.sync="flag" label-width="100px">
                <!-- 回填表单 -->
                <el-form :model="editForm" :rules="rules">
                    <!-- 账号 -->
                    <el-form-item label="账号" prop="username" :label-width="formLabelWidth">
                        <el-input style="width: 220px;" type="text" v-model="editForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 选择用户组 -->
                    <el-form-item label="用户组" prop="usergroup" :label-width="formLabelWidth">
                        <el-select v-model="editForm.usergroup" placeholder="请选择用户组">
                          <el-option label="普通用户" value="普通用户"></el-option>
                          <el-option label="高级管理员" value="高级管理员"></el-option>
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
// 引入qs
const qs = require('qs');
export default {
    data () {
        return {
            accountTableData: [],         // 用户账号表格数据
            editForm: {                   // 编辑表单的数据
                username: '',
                usergroup: ''
            },
            flag: false,                  // 控制修改模态框的显示和隐藏
            formLabelWidth: '120px',      // label的宽度
            rules: {                      // 表单验证规则
                username: [
                    { required: true, message: '请输入账号', trigger: 'change' },
                    { min: 3, max: 6, message: '账号长度在 3 到 6 位', trigger: 'change' }
                ],
                usergroup: [
                    { required: true, message: '请选择用户组', trigger: 'change' }
                ]
            },
            editId: '',                   // 用来保存被编辑数据的id
            selectedAccount: [],          // 保存被多选删除数据的id
            currentPage: 1,               // 当前页-默认值
            total: 0,                     // 数据总条数-默认值
            pageSize: 2                  // 每页显示的数据条数-默认值
        }
    },
    // 生命周期的钩子函数 created 自动触发 vue组件实例对象创建完成 dom还没有绑定 这个函数里面适合发送ajax请求 获取数据
    created() {
        // 自动发送请求 获取所有分页的用户账号数据 （只要一进入这个组件 就自动发送请求）
        this.getAccountListByPage();
    },
    methods: {
        // 按照分页显示数据的函数
        getAccountListByPage () {
            // 搜集当前页码和每页数据条数
            let currentPage = this.currentPage;
            let pageSize = this.pageSize;
            // 发送ajax请求，把每页数据发送给后端
            this.axios.get('http://127.0.0.1:1999/account/accountlistbypage',{
                params: {
                    currentPage,
                    pageSize
                }
            })
             .then(response => {
                // 接收后端返回的数据总条数 total 和 对应页码的数据 data
                let {total, data} = response.data;
                // 赋值给对应的变量
                this.total = total;
                this.accountTableData = data;
                // 如果当前页没有数据 且 排除第一页
                if(!data.length && this.currentPage !== 1){
                    // 页码减去1
                    this.currentPage -= 1;
                    // 再次调用自己
                    this.getAccountListByPage();
                }
             })
             .catch(err => {
                 console.log(err);
             })
        },
  /*       // 获取所有用户账号数据
        getAccountList () {
            this.axios.get("http://127.0.0.1:1999/account/accountlist")
             .then(response => {
                 // 把后端返回的账号数据 赋值给用户账号表格数据accountTableData
                 this.accountTableData = response.data;
             })
             .catch(err => {
                 console.log(err);
             })
        }, */
        // 编辑功能的实现（回填表单）
        handleEdit (id) {
            // 保存被点击的id
            this.editId = id;
            // 发送请求，发送id给后端
            this.axios.get(`http://127.0.0.1:1999/account/accountedit?id=${id}`)
             .then(response => {
                 //  接收后端返回的数据，后端返回的数据即使只有一条 也是数组
                let result = response.data[0];
                // 回填表单
                this.editForm.username = result.username;
                this.editForm.usergroup = result.usergroup;
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
                username: this.editForm.username,
                usergroup: this.editForm.usergroup
            }
            // 发送ajax请求 把新数据和原来的id一起发送给后端
            this.axios.post("http://127.0.0.1:1999/account/accounteditsave",qs.stringify(params))
             .then(response => {
                 // 接收错误码和提示信息
                let { error_code, reason } = response.data;
                if (error_code === 0) {
                    // 弹出成功的提示
                    this.$message({
                    type: "success",
                    message: reason
                    });
                    // 刷新列表（重新请求所有账号数据）
                    this.getAccountListByPage();
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
        // 删除按钮功能
        handleDelete (id) {
            // 点击弹出确认框
            this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                this.axios.get(`http://127.0.0.1:1999/account/accountdel?id=${id}`)
                    .then(response => {
                    // 接收后端返回的错误码 和 提示信息
                    let {error_code, reason} = response.data;
                    // 判断是否删除成功
                    if (error_code === 0) {
                        // 弹出删除成功的信息
                        this.$message({
                            type: "success",
                            message: reason
                        });
                        // 刷新列表（再次调用请求所有用户账号的函数 由于之前已经删除了 所以再次请求 得到的是删除后的数据）
                        this.getAccountListByPage();
                    } else {
                        // 弹出删除失败的提示
                        this.$message.error(reason);
                    }
                    }) 
                })
                .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
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
            this.getAccountListByPage();
        },
        // 当前页码改变 就会触发这个函数
        handleCurrentChange (val) {
            // 保存当前页码
            this.currentPage = val;
            // 调用分页函数
            this.getAccountListByPage();
        },
        // 批量删除按钮
        batchdelete () {
            // 收集被选中的账号的id
            let selectedId = this.selectedAccount.map(v => v.id);
            
            // 如果用户什么都不选且点击，跳出该函数
            if (!selectedId.length) {
                this.$message.error('请选择以后再操作！你是不是傻！');
                return;
            }

            // 选择点击后弹出确认框
            this.$confirm('此操作将永久该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
             .then(() => {
                // 发送ajax 把需要删除账号数据的id发送给后端
                this.axios.get(`http://127.0.0.1:1999/account/batchdelete`,{
                    params: {
                        selectedId
                    }
                })
                 .then(response => {
                    //  接收后端返回的数据
                    let {error_code, reason} = response.data;
                    // 判断是否删除成功
                    if (error_code === 0) {
                        // 删除成功，弹出成功提示框
                        this.$message({
                            message: reason,
                            type: 'success'
                        })
                        // 刷新列表
                        this.getAccountListByPage();
                    } else {
                        // 删除失败，弹出失败提示框
                        this.$message.error(reason);
                    }
                 })
                 .catch(err => {
                    console.log(err);
                 })
             })
             .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 取消选择按钮
        cancelSelect() {
            this.$refs.multipleTable.clearSelection();
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
            // 批量删除，取消选择按钮样式
            .bcbutton{
                line-height: 40px;
            }
            // 模态框
            .el-dialog__wrapper{
                .el-dialog{
                    width: 540px;
                    height: 480px;
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
</style>