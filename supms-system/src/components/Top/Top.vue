<template>
    <div class="top">
        <el-row>
            <el-col :span="12">
                <div class="header-left">
                    <i class="el-icon-loading"></i>
                    安安超市管理系统
                </div>
            </el-col>
            <el-col :span="12">
                <div class="header-right">
                <el-col :span="18">
                    欢迎你！
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <span>{{ username }}</span><i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                            <el-dropdown-item command="signout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="6">
                    <div class="userAvatar">
                        <img :src="avatarUrl" width="100%" height="100%">
                    </div>
                </el-col>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            username: "",
            avatarUrl:""
        }
    },
    methods: {
        handleCommand(command) {
            if (command === "signout"){
                // 清除token
                window.localStorage.removeItem('token');
                // 弹出提示
                this.$message({
                    type: 'success',
                    message: '一定要回来哦，哥哥！'
                })
                // 0.5秒后跳到登录页
                setTimeout(() => {
                    this.$router.push('/login')
                }, 200)
            } else if (command === 'personal') {
                // 跳转到个人中心
                this.$router.push('/personal');
            }
        },
        // 获取头像路劲
        getAvatar () {
            this.req.get('/login/getavatar')
                .then(response => {
                    console.log(response);
                    let data = response.data;
                    this.avatarUrl = 'http://127.0.0.1:1999' + data[data.length - 1].imgUrl;
                })
                .catch(err => {
                    console.log(err);
                })
        },
    },
    created () {
        // 显示当前登录的用户名
        this.username = window.localStorage.getItem('username')
        // 获取头像
        this.getAvatar();
    }
}
</script>
<style lang="less">
    .el-header{
        border-bottom: 1px solid #ccc;
        .top {
            line-height: 60px;
            .header-left{
                font-size: 20px;
                font-weight: bold;
            }
            .header-right{
                text-align: right;
                .el-col{
                    .el-dropdown{
                        .el-dropdown-link{
                            color: #000;
                        }
                    }
                }
                // 用户头像
                .userAvatar{
                    width: 50px;
                    height: 50px;
                    background-color: blue;
                    border-radius: 50%;
                    margin-left: 20px;
                    margin-top: 5px;
                }
            }
        }
    }
    // 用户账号下拉菜单
    .el-dropdown-menu{
        top: 40px!important;
    }
</style>