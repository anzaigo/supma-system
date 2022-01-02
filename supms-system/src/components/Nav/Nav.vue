<template>
    <div class="nav">
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
            <!-- 导航 -->
            <el-submenu :index="(index + 1) + ''" v-for="(nav, index) in premissionMenu" :key="index">
                <template slot="title">
                    <i :class="nav.icon"></i>
                    <span>{{ nav.title }}</span>
                </template>
                <el-menu-item-group v-if="nav.children && nav.children.length" >
                    <el-menu-item 
                        :key="index" 
                         v-for="(subNav, index) in nav.children" 
                        :index="subNav.path"
                    >
                        {{ subNav.subTitle }}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    data () {
        return {
            // 菜单（一般是后端做了权限控制 直接返回当前登录用户所具备的权限菜单 前端直接渲染）
            navMenu: [
                // 分类管理
                {
                    title: "分类管理",                  // 导航菜单标题
                    icon: "el-icon-set-up",            // 图标
                    roles: ["admin", "editor"],        // 用户组权限
                    children: [                        // 导航子菜单
                        {
                            subTitle: "选项1",          // 子菜单标题
                            path: "1-1"                 // 子菜单路径
                        },
                        {
                            subTitle: "选项2",
                            path: "1-2"
                        }
                    ]
                },
                // 商品管理
                {
                    title: "商品管理",                  // 导航菜单标题
                    icon: "el-icon-shopping-bag-1",            // 图标
                    roles: ["admin", "editor"],        // 用户组权限
                    children: [                        // 导航子菜单
                        {
                            subTitle: "商品管理",          // 子菜单标题
                            path: "/goodsmanage"                 // 子菜单路径
                        },
                        {
                            subTitle: "添加商品",
                            path: "/goodsadd"
                        }
                    ]
                },
                // 进货管理
                {
                    title: "进货管理",                  // 导航菜单标题
                    icon: "el-icon-sell",            // 图标
                    roles: ["admin", "editor"],        // 用户组权限
                    children: [                        // 导航子菜单
                        {
                            subTitle: "选项1",          // 子菜单标题
                            path: "1-1"                 // 子菜单路径
                        },
                        {
                            subTitle: "选项2",
                            path: "1-2"
                        }
                    ]
                },
                // 出货管理
                {
                    title: "出货管理",                  // 导航菜单标题
                    icon: "el-icon-sold-out",            // 图标
                    roles: ["admin", "editor"],        // 用户组权限
                    children: [                        // 导航子菜单
                        {
                            subTitle: "选项1",          // 子菜单标题
                            path: "1-1"                 // 子菜单路径
                        },
                        {
                            subTitle: "选项2",
                            path: "1-2"
                        }
                    ]
                },
                // 统计管理
                {
                    title: "统计管理",                  // 导航菜单标题
                    icon: "el-icon-notebook-2",            // 图标
                    roles: ["admin", "editor"],        // 用户组权限
                    children: [                        // 导航子菜单
                        {
                            subTitle: "销售统计",          // 子菜单标题
                            path: "/salesstatistics"                 // 子菜单路径
                        },
                        {
                            subTitle: "进货统计",
                            path: "1-2"
                        }
                    ]
                },
                // 账号管理
                {
                    title: "账号管理",                  // 导航菜单标题
                    icon: "el-icon-edit-outline",            // 图标
                    roles: ["admin"],        // 用户组权限
                    children: [                        // 导航子菜单
                        {
                            subTitle: "账号管理",          // 子菜单标题
                            path: "/accountmanage"                 // 子菜单路径
                        },
                        {
                            subTitle: "添加账号",
                            path: "/accountadd"
                        },
                        {
                            subTitle: "密码修改",
                            path: "/modifypassword"
                        }
                    ]
                },
                // 会员管理
                {
                    title: "会员管理",                  // 导航菜单标题
                    icon: "el-icon-s-custom",            // 图标
                    roles: ["admin", "editor"],        // 用户组权限
                    children: [                        // 导航子菜单
                        {
                            subTitle: "选项1",          // 子菜单标题
                            path: "1-1"                 // 子菜单路径
                        },
                        {
                            subTitle: "选项2",
                            path: "1-2"
                        }
                    ]
                },
                // 系统管理
                {
                    title: "系统管理",                  // 导航菜单标题
                    icon: "el-icon-setting",            // 图标
                    roles: ["admin", "editor"],        // 用户组权限
                    children: [                        // 导航子菜单
                        {
                            subTitle: "系统信息",          // 子菜单标题
                            path: "/"                 // 子菜单路径
                        },
                        {
                            subTitle: "系统配置",
                            path: "/configuration"
                        },
                        {
                            subTitle: "权限管理",
                            path: "1-2"
                        },
                        {
                            subTitle: "添加管理组",
                            path: "1-3"
                        }
                    ]
                }
            ],
            // 过滤出来的菜单
            premissionMenu: []
        }
    },
    created () {
        // 过滤菜单
        this.filterMenu();
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        // 过滤菜单
        filterMenu () {
            // 获取本地存在中的roles数组
            let roles = JSON.parse(window.localStorage.getItem("roles"));
            // 定义一个过滤后的权限菜单
            let tempMenu = [];
            // 循环导航
            this.navMenu.forEach(nav => {
            // 循环roles权限数组
            roles.forEach(role => {
                // 判断每一项是否包含 role (admin)
                if (nav.roles.includes(role)) {
                tempMenu.push(nav);
            }
        });
      });
      // 最终过滤出来的菜单 赋值给权限菜单   
      this.premissionMenu = tempMenu; 
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
        .nav{
            .el-menu {
                border: none;
            }
        }
    }
</style>