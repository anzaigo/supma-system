<template>
    <div class="gootsadd">
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>添加商品</span>
            </div>
            <!-- 内容表单 -->
            <el-form :model="gootsAddForm" 
            :rules="rules" 
            ref="gootsAddForm" 
            label-width="110px" 
            class="demo-ruleForm"
            size="small">
                <!-- 商品分类 -->
                <el-form-item label="所属分类：" prop="classify">
                    <el-select v-model="gootsAddForm.classify" placeholder="选择分类">
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

                <!-- 商品条形码 -->
                <el-form-item label="商品条形码：" prop="barcode">
                    <el-input v-model="gootsAddForm.barcode"></el-input>
                </el-form-item>
                
                <!-- 商品名称 -->
                <el-form-item label="商品名称：" prop="gootsname">
                    <el-input v-model="gootsAddForm.gootsname"></el-input>
                </el-form-item>

                <!-- 商品进价 -->
                <el-form-item label="商品进价：" prop="purchaseprice" >
                    <el-input v-model="gootsAddForm.purchaseprice" @blur="autoPrice" oninput="value=value.replace(/[^\d]/g,'')" maxLength='9'></el-input>
                </el-form-item>

                <!-- 商品售价 -->
                <el-form-item label="商品售价：" prop="price">
                    <el-input v-model="gootsAddForm.price" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>

                <!-- 市场价 -->
                <el-form-item label="市场价：" prop="marketvalue">
                    <el-input v-model="gootsAddForm.marketvalue" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    <p class="product-des">默认市场价为售价的1.5倍</p>
                </el-form-item>

                <!-- 入库数量 -->
                <el-form-item label="入库数量：" prop="quantity">
                    <el-input v-model="gootsAddForm.quantity" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    <p class="product-des">记重商品单位为千克</p>
                </el-form-item>

                <!-- 商品重量 -->
                <el-form-item label="商品重量：" prop="weight">
                    <el-input v-model="gootsAddForm.weight" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>

                <!-- 商品单位 -->
                <el-form-item label="商品单位：" prop="company">
                    <el-select v-model="gootsAddForm.company" placeholder="选择单位">
                        <el-option label="斤" value="斤"></el-option>
                        <el-option label="只" value="只"></el-option>
                        <el-option label="克" value="克"></el-option>
                        <el-option label="个" value="个"></el-option>
                        <el-option label="瓶" value="瓶"></el-option>
                        <el-option label="袋" value="袋"></el-option>
                        <el-option label="栏" value="栏"></el-option>
                        <el-option label="盒" value="盒"></el-option>
                        <el-option label="包" value="包"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 会员优惠 -->
                <el-form-item label="会员优惠：" prop="discount">
                    <el-radio-group v-model="gootsAddForm.discount">
                        <el-radio label="享受"></el-radio>
                        <el-radio label="不享受"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- 是否促销 -->
                <el-form-item label="是否促销：" prop="promotion">
                    <el-radio-group v-model="gootsAddForm.promotion">
                        <el-radio label="促销"></el-radio>
                        <el-radio label="不促销"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- 商品简介 -->
                <el-form-item label="商品简介" prop="gootsdesc">
                    <el-input type="textarea" v-model="gootsAddForm.gootsdesc" maxlength="200"></el-input>
                    <p class="product-des">不超过200字</p>
                </el-form-item>

                <!-- 添加&重置 按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('gootsAddForm')">添加</el-button>
                    <el-button @click="resetForm('gootsAddForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            gootsAddForm: {
                classify: '',               // 商品分类
                barcode: '',                // 商品条形码
                gootsname: '',              // 商品名称
                purchaseprice: '',          // 商品进价
                marketvalue: '',            // 市场价
                price: '',                  // 商品售价
                quantity: '',               // 入库数量
                weight: '',                 // 商品重量
                company: '',                // 商品单位
                discount: '不享受',          // 会员优惠
                promotion: '不促销',         // 是否促销
                gootsdesc: ''               // 商品简介
            },
            rules: {
                // 商品分类
                classify: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ], 
                // 商品条形码
                barcode: [
                    { required: true, message: '请出入条形码', trigger: 'blur' }
                ], 
                // 商品名称
                gootsname: [
                    { required: true, message: '请出入商品名称', trigger: 'blur' }
                ], 
                // 商品进价
                purchaseprice: [
                    { required: true, message: '请出入商品进价', trigger: 'blur' },
                ], 
                // 市场价
                marketvalue: [
                    { required: true, message: '请出入商品市场价', trigger: 'blur' }
                ], 
                // 商品售价
                price: [
                    { required: true, message: '请出入商品售价', trigger: 'blur' }
                ], 
                // 入库数量
                quantity: [
                    { required: true, message: '请出入入库数量', trigger: 'blur' }
                ], 
                // 商品重量
                weight: [
                    { required: true, message: '请出入商品重量', trigger: 'blur' }
                ], 
                // 商品单位
                company: [
                    { required: true, message: '请出入商品单位', trigger: 'blur' }
                ],
                // 是否打折
                discount: [
                    { required: true, message: "不能为空", trigger: "blur" } // 非空验证
                ],
                // 是否促销
                promotion: [
                    { required: true, message: "不能为空", trigger: "blur" } // 非空验证
                ],
                // 商品描述
                gootsdesc: [
                    { required: true, message: "不能为空", trigger: "blur" } // 非空验证
                ]
            }
        }
    },
    methods: {
        // 自动填充价格
        autoPrice () {
            this.gootsAddForm.price = this.gootsAddForm.purchaseprice *1.2
            this.gootsAddForm.marketvalue = Math.ceil(this.gootsAddForm.price * 1.5);
            
        },
        // 添加按钮
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 获取用户输入的表单数据
                    let params = {
                        classify: this.gootsAddForm.classify,
                        barcode: this.gootsAddForm.barcode,
                        gootsname: this.gootsAddForm.gootsname,
                        purchaseprice: this.gootsAddForm.purchaseprice,
                        marketvalue: this.gootsAddForm.marketvalue,
                        price: this.gootsAddForm.price,
                        quantity: this.gootsAddForm.quantity,
                        weight: this.gootsAddForm.weight,
                        company: this.gootsAddForm.company,
                        discount: this.gootsAddForm.discount,
                        promotion: this.gootsAddForm.promotion,
                        gootsdesc: this.gootsAddForm.gootsdesc
                    };
                    // 发生ajax给请求给后端
                    this.req.post("/goods/goodsadd", params)
                     .then(response => {
                         // 接收后端返回的数据
                         let {error_code, reason} = response;
                         //  判断
                         if(error_code === 0){
                             this.$message({
                                 showClose: true,
                                 message: '添加账号成功',
                                 type: 'success'
                             });
                             this.$router.push("/goodsmanage");
                         }else{
                             this.$message.error(reason);
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
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="less">
.gootsadd{
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