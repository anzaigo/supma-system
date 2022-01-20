<template>
    <div class="goodscheckout">
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>商品出库</span>
            </div>
            <!-- 内容表单 -->
            <el-form :model="goodsCheckoutForm" 
            :rules="rules" 
            ref="goodsCheckoutForm" 
            label-width="110px" 
            class="demo-ruleForm"
            size="small"
            :label-position="labelPosition">

                <!-- 商品条形码 -->
                <el-form-item label="商品条形码：" prop="barcode">
                    <el-input v-model="goodsCheckoutForm.barcode"></el-input>
                </el-form-item>

                <!-- 数量 -->
                <el-form-item label="数量：" prop="quantity">
                    <el-input v-model="goodsCheckoutForm.quantity" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    <p class="product-des">记重商品单位为千克</p>
                </el-form-item>

                <!-- 会员卡号 -->
                <el-form-item label="会员卡号：" prop="cardNumber">
                    <el-input v-model="goodsCheckoutForm.cardNumber" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>

                <!-- 添加&重置 按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('goodsCheckoutForm')">加入订单</el-button>
                    <el-button @click="resetForm('goodsCheckoutForm')">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 已售商品表格 -->
            <el-table
                ref="multipleTable"
                :data="goodsCheckoutTableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >

                <!-- 商品名称 -->
                <el-table-column
                    prop="goodsName"
                    label="商品名称"
                    >
                </el-table-column>

                <!-- 数量 -->
                <el-table-column
                    prop="quantitytwo"
                    label="数量"
                    >
                </el-table-column>

                <!-- 单价 -->
                <el-table-column
                    prop="unitPrice"
                    label="单价"
                    >
                </el-table-column>

                <!-- 总价 -->
                <el-table-column
                    prop="totalPrice"
                    label="总价"
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
                        </el-button>
                        
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </template>
                </el-table-column>
               
            </el-table>
             
            <!-- 总价格 -->
            <div class="pridel">
                <p>总价：<span class="pricedel">{{pricedel}}</span>元，优惠<span class="discount">{{discount}}元</span>，小计<span class="subtotal">{{subtotal}}元</span></p>
            </div>
    
        </el-card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            labelPosition: 'top',           // 表单顶部对齐
            goodsCheckoutForm: {            // 商品销售表单
                barcode: '',                // 商品条形码
                quantity: '',               // 数量
                cardNumber: ''             // 会员卡号
            },
            rules: {                        // 商品销售表单验证规则
                // 商品条形码
                barcode: [
                    { required: true, message: '请出入条形码', trigger: 'blur' }
                ], 
                // 数量
                quantity: [
                    { required: true, message: '请出入数量', trigger: 'blur' }
                ]
            },
            goodsCheckoutTableData: [],            // 已售商品表格
            formLabelWidth: '120px',        // 已售商品表格的label的宽度
            currentPage: 1,                 // 当前页-默认值
            total: 0,                       // 数据总条数-默认值
            pageSize: 4,                    // 默认显示当前页多少条数据
            pricedel: 0,                    // 总价
            discount: 0,                    // 优惠
            subtotal: 0                    // 小计
        }
    },
    created() {
        // 自动发送请求
        // this.getGoodsCheckoutByPage();
    },
    methods: {
        // 加入订单按钮
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 获取用户输入的表单数据
                    let params = {
                        barcode: this.goodsCheckoutForm.barcode,
                        quantity: this.goodsCheckoutForm.quantity,
                        cardNumber: this.goodsCheckoutForm.cardNumber
                    };
                    // 发生ajax给请求给后端
                    this.req.post("/stock/goodscheckout", params)
                     .then(response => {
                         // 接收后端返回的数据
                         let result = response[0]
                         console.log(result);
                         // 回填表单
                         this.goodsCheckoutTableData.goodsName = result.goodsName;
                         this.goodsCheckoutTableData.quantitytwo = this.goodsCheckoutForm.quantity;
                         console.log(this.goodsCheckoutTableData.goodsName);
                        //  this.getGoodsCheckoutByPage();
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
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        // // 按照分页显示数据的函数
        // getGoodsCheckoutByPage () {
        //     let params = {
        //                 barcode: this.goodsCheckoutForm.barcode,
        //                 quantity: this.goodsCheckoutForm.quantity,
        //                 cardNumber: this.goodsCheckoutForm.cardNumber
        //             };
        //     this.req.get('/stock/goodschekoutbypage',params)
        //      .then(response => {
        //          this.goodsCheckoutTableData = response;
        //          console.log(response);
        //      })
        //      .catch(err => {
        //          console.log(err);
        //      })
        // },
        // 当单选框的选中状态改变 就会触发这个函数 val就是选中的数据 是一个数组 数组里面是数据对象
        handleSelectionChange (val) {
            // 保存被选中的状态
            this.selectedAccount = val;
        },
    }
}
</script>
<style lang="less">
.goodscheckout{
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
        .el-card__body{
            .el-form {
                width: 310px;
                .el-form-item{
                    margin-bottom: 20px;
                    .el-form-item__content{
                        .product-des{
                            margin: 5px 0 0 0;
                            font-size: 12px;
                            line-height: 12px;
                            color: #bbb;
                        }
                    }
                }
            }
        }
    }
}
</style>