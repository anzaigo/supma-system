<template>
    <div class="memberadd">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>添加会员</span>
            </div>
            <!-- 会员表单 -->
            <el-form :model="memberaddForm" status-icon :rules="rules" ref="memberaddForm" label-width="100px" class="demo-ruleForm" size=mini>
                <!-- 真实名字 -->
                <el-form-item label="真实名字" prop="userName">
                    <el-input type="text" v-model="memberaddForm.userName" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 会员卡卡号 -->
                <el-form-item label="会员卡卡号" prop="cardNumber">
                    <el-input type="text" v-model="memberaddForm.cardNumber" autocomplete="off" maxlength="6"></el-input>
                </el-form-item>

                <!-- 会员等级 -->
                <el-form-item label="会员等级" prop="memberLevel">
                    <el-select v-model="memberaddForm.memberLevel" placeholder="选择用户组">
                        <el-option label="普通会员" value="普通会员"></el-option>
                        <el-option label="高级会员" value="高级会员"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 身份证号 -->
                <el-form-item label="身份证号" prop="identityCard">
                    <el-input type="text" v-model="memberaddForm.identityCard" autocomplete="off" maxlength="18"></el-input>
                </el-form-item>

                <!-- 用户状态 -->
                <el-form-item label="用户状态" prop="userStatus">
                    <el-radio-group v-model="memberaddForm.userStatus">
                        <el-radio label="启用"></el-radio>
                        <el-radio label="禁用"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- 手机号码 -->
                <el-form-item label="手机号码" prop="telephone">
                    <el-input type="text" v-model="memberaddForm.telephone" autocomplete="off" maxlength="11"></el-input>
                </el-form-item>

                <!-- 邮箱地址 -->
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="memberaddForm.email"></el-input>
                </el-form-item>

                <!-- 地区选择 -->
                <el-form-item label="地区选择" prop="district">
                    <myDistrict
                        :province.sync="memberaddForm.district.province"
                        :city.sync="memberaddForm.district.city"
                        :area.sync="memberaddForm.district.area"
                        class="district"
                    >
                    </myDistrict>
                </el-form-item>

                <!-- 详细地址 -->
                <el-form-item label="详细地址" prop="detailedAddress">
                    <el-input type="text" v-model="memberaddForm.detailedAddress" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 邮政编码 -->
                <el-form-item label="邮政编码" prop="postalCode">
                    <el-input type="text" v-model="memberaddForm.postalCode" autocomplete="off" maxlength="5"></el-input>
                </el-form-item>

                <!-- 添加&重置 按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('memberaddForm')">添加</el-button>
                    <el-button @click="resetForm('memberaddForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import myDistrict from 'my-district';
// 自定义选择地址表单验证
let checkDistrict= (rule, {province, city, area}, cb) => {
  if (!province) {
    cb(new Error('请选择省'))
  } else if (!city) {
    cb(new Error('请选择市'))
  } else if (!area) {
    cb(new Error('请选择区'))
  } else {
    cb()
  }
}
export default {
    data () {
        return {
            // 会员表单数据
            memberaddForm: {                    
                userName: '',                   // 真实名字
                cardNumber: '',                 // 会员卡卡号
                memberLevel: '',                // 会员等级
                identityCard: '',               // 身份证号
                userStatus: '启用',                 // 用户状态
                telephone: '',                  // 手机号码
                email: '',                      // 邮箱地址
                district: {                     // 地区选择
                    province: '',                   // 省
                    city: '',                       // 市
                    area: ''                        // 区
                },
                detailedAddress: '',            // 详细地址         
                postalCode: ''                 // 邮政编码
            },
            // 会员表单验证
            rules: {
                userName: [         // 真实名字
                    { required: true, message: '请输入您的名字', trigger: 'blur' }
                ],
                cardNumber: [       // 会员卡卡号
                    { required: true, message: '请输入会员卡卡号', trigger: 'blur'},
                    { min: 6, max: 6, message: '请输入6位的会员卡卡号', trigger: 'blur' },
                ],
                memberLevel: [      // 会员等级
                    { required: true, message: '请选择用户组', trigger: 'blur'}
                ],
                identityCard: [     // 身份证号
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { min: 18, max: 18, message: '请检查身份证号是否正确', trigger: 'blur' }
                ],
                userStatus: [       // 用户状态
                    { required: true, message: '请选择用户状态', trigger: 'blur' },
                ],
                telephone: [        // 手机号码
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '请检查手机号是否正确', trigger: 'blur' },
                ],
                email: [            // 邮箱地址
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                district: [         // 地区选择
                    { required: true, validator: checkDistrict, trigger: 'blur'},
                ],
                detailedAddress: [  // 详细地址
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                ],
                postalCode: [       // 邮政编码
                    { required: true, message: '请输入邮政编码', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        // 添加按钮
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 收集所有表单数据
                    let params = {
                        userName: this.memberaddForm.userName,
                        cardNumber: this.memberaddForm.cardNumber,
                        memberLevel: this.memberaddForm.memberLevel,
                        identityCard: this.memberaddForm.identityCard,
                        userStatus: this.memberaddForm.userStatus,
                        telephone: this.memberaddForm.telephone,
                        email: this.memberaddForm.email,
                        province: this.memberaddForm.district.province,
                        city: this.memberaddForm.district.city,
                        area: this.memberaddForm.district.area,
                        detailedAddress: this.memberaddForm.detailedAddress,
                        postalCode: this.memberaddForm.postalCode,
                    };
                    // 使用axios发送数据给后端
                    this.req.post('/member/memberadd', params)
                     .then(response => {
                         console.log(response);
                         // 接收后端返回的数据
                         let {error_code, reason} = response;
                        //  判断
                        if(error_code === 0) {
                            // 验证成功后跳到-账号管理-页面
                            this.$message({
                                showClose: true,
                                message: reason,
                                type: 'success'
                            });
                            this.$router.push("/membermanage");
                        }else{
                            this.$message.error(reason);
                        }
                     })
                     .catch(err => {
                         console.log(err);
                     })
                } else {
                    return false;
                }
            });
        },
        // 重置按钮
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    components: {
        myDistrict            
    }
}
</script>
<style lang="less">
.memberadd{
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
            // 会员表单
            .el-form {
                width: 900px;
                // 每一项表单内容
                .el-form-item{
                    width: 100%;
                    margin-bottom: 20px;
                    .el-form-item__content{
                        width: 900px;
                        // 输入框样式
                        .el-input{
                            width: 200px;
                        }
                        // 地址input样式
                        .distinct-component-ct{
                            .el-select{
                                width: 150px!important;
                                .el-input{
                                    width: 150px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>