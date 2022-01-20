<template>
    <div class="stockadd">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>添加库存</span>
            </div>
            <el-form label-width="120px" :model="formStockAdd" :rules="rules" ref="formStockAdd">
                <el-form-item label="商品条形码：" prop="barCode">
                    <el-input v-model="formStockAdd.barCode" oninput="value=value.replace(/[^\d]/g,'')" maxLength='13'></el-input>
                </el-form-item>
                <el-form-item label="商品名称：" prop="goodsname">
                    <el-input v-model="formStockAdd.goodsname"></el-input>
                </el-form-item>
                <el-form-item label="数量：" prop="quantity">
                    <el-input v-model="formStockAdd.quantity" oninput="value=value.replace(/[^\d]/g,'')" maxLength='9'></el-input>
                </el-form-item>
                <el-form-item label="进价：" prop="costPrice">
                    <el-input v-model="formStockAdd.costPrice" oninput="value=value.replace(/[^\d]/g,'')" maxLength='13'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('formStockAdd')">入库</el-button>
                    <el-button @click="resetForm('formStockAdd')">重置</el-button>
                </el-form-item>
            </el-form>
            
        </el-card>
    </div>
</template>
<script>

export default {
    data () {
        return {
            // 表单的默认数据
            formStockAdd: {
                barCode: '',            // 商品条形码
                goodsname: '',          // 商品名称
                quantity: '',           // 数量
                costPrice: ''           // 进价
            },
            // 表单验证
            rules: {
                barCode: [
                    { required: true, message: '条形码不能为空', trigger: 'blur'},
                    { min: 13, max: 13, message: '请输入13位的条形码', trigger: 'blur' }
                ],
                goodsname: [
                    { required: true, message: '商品名不能为空', trigger: 'blur'},
                ],
                quantity: [
                    { required: true, message: '数量不能为空', trigger: 'blur'},
                ],
                costPrice: [
                    { required: true, message: '进价不能为空', trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        // 入库按钮
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // 收集用户输入的表单数据
                let params = {
                    barCode: this.formStockAdd.barCode,
                    goodsname: this.formStockAdd.goodsname,
                    quantity: this.formStockAdd.quantity,
                    costPrice: this.formStockAdd.costPrice
                }
                this.req.get('/stock/stockadd', params)
                    .then(response => {
                        console.log(response);
                        // 接收后端响应回来的数据
                        let {error_code, reason} = response;
                        // 判断
                        if (error_code === 0) {
                            // 弹出成功提示
                            this.$message({
                                message: reason,
                                type: 'success'
                            });
                            // 跳转到库存管理页
                            this.$router.push("/stockmanage");
                        } else {
                            this.$message({
                                message: reason,
                                type: 'success'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        // 重置按钮
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="less">
.stockadd{
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
            .el-form{
                width: 400px;
            }
        }
    }
}
</style>