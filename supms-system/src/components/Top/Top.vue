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
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <span>{{ username }}</span><i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="6">
                    <div class="userAvatar">
                        <img src="" alt="">
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
            username: "admin"
        }
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
</style>