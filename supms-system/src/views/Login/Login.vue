<template>
    <div class="login">
        <!-- 登录表单容器 -->
        <div class="login-wrapper">
            <!-- 登录标题 -->
            <h1 class="title"><i class="el-icon-loading"></i>安仔超市管理系统</h1>
            <!-- 登录表单 -->
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input type="password" v-model="loginForm.checkPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
// 引入qs
import qs from 'qs';

export default {
    data() {
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
                if (this.loginForm.checkPwd !=='') {
                    this.$refs.loginForm.validateField('checkPwd');
                } 
                callback();
            }
        };
        // 再次输入密码验证
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.loginForm.password) {
                callback(new Error('两次输入密码不一致'));
            }else{
                callback();
            }
        }
        return {
            loginForm: {
                username: '',
                password: '',
                checkPwd: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'change' },
                    { min: 2, max: 6, message: '账号长度在 2 到 6 位', trigger: 'change' }
                ],
                password: [
                    { required: true, validator: validatePass, trigger: 'change'}
                ],
                checkPwd: [
                    { required: true, validator: validatePass2, trigger: 'change'}
                ]
                // 验证规则字段说明：
                // { required: true/false 必填, message: "错误的提示信息", trigger: "触发验证的方式" }blur: 失焦触发，change：值变动触发
                // { min: 最小长度, max: 最大长度, message: "错误的提示信息", trigger: "触发验证的方式" }
                // { required: true/false 必填，validator： 自定义验证规则函数名，  trigger: 'blur'}
            }
        };
    },
    methods: {
        // 点击登录按钮 触发这个函数
        submitForm(formName) {
            // 获取表单组件 调用验证方法
            this.$refs[formName].validate((valid) => {
                // 如果所有验证通过 valid就是true
                if (valid) {
                    // 收集账号和密码
                    let params = {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    };
                    // 发送请求 把参数发给后端（把用户名和密码发给后端 验证是否存在这个账号）
                    this.axios.post('http://127.0.0.1:1999/login/checklogin',qs.stringify(params))
                     .then(response => {
                        //  接收后端返回的数据
                        let {err_code, reason, token } = response.data;
                        // 判断是否成功
                        if (err_code === 0) {
                            // 把token存储到浏览器的本地存储中
                            window.localStorage.setItem('token', token);
                            // 把用户名存入本地仓库
                            // window.localStorage.setItem('username', username);

                            // 弹出成功提示
                            this.$message({
                                message: reason,
                                type: 'success'
                            })
                            // 跳转到后端首页
                            this.$router.push('/');
                        } else {
                            // 弹出失败提示
                            this.$message.error(reason);
                        }
                     })
                     .catch(err => {
                         console.log(err);
                     })
                } else {
                    alert('前端验证失败，不能提交给后端!');
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
    .login{
        width: 100%;
        height: 100%;
        background-color: #2d3a4b;
        .login-wrapper{
            width: 500px;
            height: 280px;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            padding: 20px 35px 35px 0;
        }
        .title{
            font-size: 20px;
            color: #fff;
            margin-left: 60px;
            .el-icon-loading{
                margin-right: 10px;
            }
        }
        .el-form{
            .el-form-item{
                .el-form-item__label{
                    color: #fff;
                }
            }
        }
    }
</style>