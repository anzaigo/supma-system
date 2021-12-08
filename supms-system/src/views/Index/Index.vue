<template>
    <el-container>
        <!-- 左侧导航 -->
        <el-aside width="200px">
            <!-- 左侧导航Nav组件 -->
            <Nav></Nav>
        </el-aside>
        <!-- 右侧内容 -->
        <el-container>
            <!-- 右侧内容头部 -->
            <el-header>
                <!-- 右侧内容头部组件 -->
                <Top></Top>
            </el-header>
            <!-- 右侧内容中间 -->
            <el-main>
                <!-- 路由出口 -->
                <router-view />
            </el-main>
            <!-- 右侧内容尾部 -->
            <el-footer>
                <!-- 右侧内容尾部组件 -->
                <Bottom></Bottom>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
// 引入导航组件
import Nav from '@/components/Nav/Nav.vue';
// 引入右侧头部组件
import Top from '@/components/Top/Top.vue';
// 引入右侧内容尾部组件
import Bottom from '@/components/Bottom/Bottom.vue'

export default {
    components: {   // 注册组件
        Nav,
        Top,
        Bottom
    }
}
</script>

<style lang="less">
.el-container {
    height: 100%;
    // 右侧内容
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        line-height: 160px;
    }
}
</style>