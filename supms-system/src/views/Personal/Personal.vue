<template>
    <div class="personal">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" >
                <span>个人中心</span>
            </div>
            <!-- 中间内容 -->
            <div class="text">
                <!-- 账号信息 -->
                <div class="info">
                    <h3>账号信息：</h3>
                    <p>账号：{{userinfo.username}}</p>
                    <p>用户组：{{userinfo.usergroup}}</p>
                    <p>创建时间：{{userinfo.ctime | filtersCtime}}</p>
                </div>
                <!-- 上传图片 -->
                <div class="upload-pictures">
                    <el-upload
                        class="avatar-uploader"
                        action="http://127.0.0.1:1999/login/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            
        </el-card>
    </div>
</template>
<script>
// 引入moment
import moment from "moment";
export default {
    data() {
        return {
            userinfo: {
                username: '',
                usergroup: '',
                ctime: ''
            },
            avatarUrl: ''
        }
    },
    created () {
        // 发送请求获取个人信息
        this.getAccountInfo();
    },
    methods: {
        // 获取账号信息
        getAccountInfo () {
            // 发送请求
            this.req.get("/account/accountinfo")
                .then(response => {
                    // 接收后端返回的数据
                    this.userinfo = response;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        // 上传成功的函数
        handleAvatarSuccess(res, file) {
            this.avatarUrl = URL.createObjectURL(file.raw);
        },
        // 上传之前的限制函数
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    filters: {
        // 过滤时间
        filtersCtime (val) {
            return moment(val).format("YYYY-MM-DD hh:mm:ss");
        }
    } 
}
</script>
<style lang="less">
.personal{
    // 面板组件样式
    .el-card{
        border-radius: 10px;
        // 面板组件头部样式
        .el-card__header{
            text-align: left;
            font-size: 18px;
            font-weight: 600;
            background-color: #f1f1f1;
            height: 45px;
            line-height: 10px;
        }
        // 中间内容
        .el-card__body{
            .text{
                // 上传图片
                .upload-pictures{
                    .avatar-uploader{
                        .el-upload{
                            border: 1px dashed #d9d9d9;
                            border-radius: 6px;
                            cursor: pointer;
                            position: relative;
                            overflow: hidden;
                        }
                        .el-upload:hover{
                            border-color: #409EFF;
                        }
                        // 图片样式
                        .avatar{
                                width: 178px;
                                height: 178px;
                                display: block;
                        }
                        // 图标样式
                        .avatar-uploader-icon{
                                font-size: 28px;
                                color: #8c939d;
                                width: 178px;
                                height: 178px;
                                line-height: 178px;
                                text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>