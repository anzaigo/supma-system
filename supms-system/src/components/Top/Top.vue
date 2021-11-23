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
                    <div>欢迎你！<span>{{ username }}</span></div>
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
    .top {
        line-height: 60px;
        .header-left{
            font-size: 20px;
            font-weight: bold;
        }
        .header-right{
            text-align: right;
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
</style>