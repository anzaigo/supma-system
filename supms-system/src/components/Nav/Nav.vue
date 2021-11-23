<template>
    <el-menu 
    :default-active="this.$route.path" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose" 
    background-color="#545c64" 
    text-color="#fff" 
    active-text-color="rgb(64, 158, 255)" 
    unique-opened 
    router
    >
        <!-- 分类管理 -->
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-set-up"></i>
                <span>分类管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- 商品管理 -->
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-shopping-bag-1"></i>
                <span>商品管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- 进货管理 -->
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-sell"></i>
                <span>进货管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- 出货管理 -->
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-sold-out"></i>
                <span>出货管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- 统计管理 -->
        <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span>统计管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- 账号管理 -->
        <el-submenu index="6">
            <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span>账号管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- 会员管理 -->
        <el-submenu index="7">
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>会员管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- 系统管理 -->
        <el-submenu index="8">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/">系统信息</el-menu-item>
                <el-menu-item index="/systemconfiguration">系统配置</el-menu-item>
                <el-menu-item index="1-2">权限管理</el-menu-item>
                <el-menu-item index="1-2">添加管理组</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style lang="less">
    // 左侧导航
    .el-aside {
        background-color: #545c64;
        color: #333;
        text-align: center;
        line-height: 200px;
        .el-menu {
            border: none;
        }
    }
</style>