<template>
    <div class="modifypassword">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>密码修改</span>
            </div>
            <el-form :model="modifypasswordForm" status-icon :rules="rules" ref="modifypasswordForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="text" v-model="modifypasswordForm.oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="modifypasswordForm.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="checkNewPwd">
                    <el-input type="password" v-model="modifypasswordForm.checkNewPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('modifypasswordForm')">提交</el-button>
                    <el-button @click="resetForm('modifypasswordForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>

// 引入qs库
import qs from 'qs';

export default {
    data () {
        // 定义密码特殊符号验证规则
        const checkSpecificKey = str => {
            var specialKey ="[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
            for (var i = 0; i < str.length; i++) {
                if (specialKey.indexOf(str.substr(i, 1)) != -1) {
                    return false;
                 }
            }
            return true;
        };
        // 密码验证
        const validatePass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入密码'));
            }else if(!checkSpecificKey(value)){
                callback(new Error("密码不能包含特殊字符"));
            }else if(value.length<3 || value.length>6){
                return callback(new Error('请输入3到6位的密码'));           
            }else{
                if (this.modifypasswordForm.checkNewPwd !=='') {
                    this.$refs.modifypasswordForm.validateField('checkNewPwd');
                } 
                callback();
            }
        };
        // 再次输入密码验证
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.modifypasswordForm.newPassword) {
                callback(new Error('两次输入密码不一致'));
            }else{
                callback();
            }
        }
        // 验证旧密码是否正确
        const checkOldPwd = (rule, value, callback) => {
            // 获取当前登录的账户
            let username = window.localStorage.getItem("username");
            this.req.get(`/account/checkOldPwd`,{
                oldPassword: value,
                username
            })
             .then(response => {
                 // 接收后端发回来的数据
                 let {error_code, reason} = response;
                 // 判断
                 if(error_code === 0) {
                     callback();
                 } else {
                     callback(new Error(reason));
                 }
             })
             .catch(err => {
                 console.log(err);
             })
        }
        return {
            modifypasswordForm: {
                oldPassword: '',
                newPassword: '',
                checkNewPwd: ''
            },
            rules: {
                oldPassword: [
                    { required: true, validator: checkOldPwd, trigger: 'blur' },
                ],
                newPassword: [
                    { required: true, validator: validatePass, trigger: 'change'}
                ],
                checkNewPwd: [
                    { required: true, validator: validatePass2, trigger: 'change'}
                ]
            }
        }
    },
    methods: {
        // 点击登录按钮 触发这个函数
        submitForm(formName) {
            // 获取表单组件 调用验证方法
            this.$refs[formName].validate((valid) => {
                // 如果所有验证通过 valid就是true
                if (valid) {
                    // 收集参数
                    let params = {
                        username: window.localStorage.getItem("username"),
                        oldPassword: this.modifypasswordForm.oldPassword,
                        newPassword: this.modifypasswordForm.newPassword
                    };
                    // 发生ajax给后端
                    this.req
                     .post("/account/savenewpwd", params)
                     .then(response => {
                        // 接收后端返回的数据
                        let {error_code, reason} = response;
                        // 判断是否修改成功
                        if (error_code === 0) {
                            // 弹出提示
                            this.$message({
                                type: "success",
                                message: reason
                            })
                            // 清除token
                            window.localStorage.removeItem("token");
                            // 跳到登录页面
                            this.$router.push("/login");
                        } else {
                            // 弹出错误提示
                            this.$message(reason);
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="less">
.modifypassword{
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
            .el-form {
                width: 400px;
                .el-form-item{
                    margin-bottom: 20px;
                }
            }
        }
    }
}
</style>