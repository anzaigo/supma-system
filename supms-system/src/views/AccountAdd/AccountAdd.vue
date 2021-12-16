<template>
    <div class="accountadd">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>添加账号</span>
            </div>
            <el-form :model="accountaddForm" status-icon :rules="rules" ref="accountaddForm" label-width="100px" class="demo-ruleForm" size=mini>
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="accountaddForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="accountaddForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input type="password" v-model="accountaddForm.checkPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择用户组" prop="userGroup">
                    <el-select v-model="accountaddForm.userGroup" placeholder="选择用户组">
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="用户管理员" value="用户管理员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('accountaddForm')">提交</el-button>
                    <el-button @click="resetForm('accountaddForm')">重置</el-button>
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
                if (this.accountaddForm.checkPwd !=='') {
                    this.$refs.accountaddForm.validateField('checkPwd');
                } 
                callback();
            }
        };
        // 再次输入密码验证
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.accountaddForm.password) {
                callback(new Error('两次输入密码不一致'));
            }else{
                callback();
            }
        }
        return {
            accountaddForm: {
                username: '',
                password: '',
                checkPwd: '',
                userGroup: ''
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
                ],
                userGroup: [
                    { required: true, message: '请选择用户组', trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 收集账号和密码
                    let params = {
                        username: this.accountaddForm.username,
                        password: this.accountaddForm.password,
                        userGroup: this.accountaddForm.userGroup
                    };
                    // 使用axios发送数据给后端
                    this.axios.post('http://127.0.0.1:1999/account/accountadd',qs.stringify(params))
                     .then(response => {
                         console.log(response.data);
                     })
                     .catch(err => {
                         console.log(err);
                     })
                    // 验证成功后跳到-账号管理-页面
                    this.$message({
                        showClose: true,
                        message: '添加账号成功',
                        type: 'success'
                    });
                    this.$router.push("/accountmanage");
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
.accountadd{
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
                width: 300px;
                .el-form-item{
                    margin-bottom: 20px;
                }
            }
        }
    }
}
</style>