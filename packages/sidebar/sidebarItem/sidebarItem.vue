<template>
    <div>
        <template v-for="item in routes" v-if="!item.hidden && item.children">
            
            <router-link
                v-if="item.children.length === 1 && !item.children[0].children && !item.alwaysShow && checkPageRole(item.meta.roles) "
                :to="item.path + '/' + item.children[0].path"
                :key="item.children[0].name">
                <el-menu-item
                    :index="item.path + '/' + item.children[0].path"
                    :class="{'submenu-title-noDropdown' : !isNest}">
                    <span
                        v-if="item.children[0].meta && item.children[0].meta.title">
                        {{ item.children[0].meta.title }}
                    </span>
                </el-menu-item>
            </router-link>

            <el-submenu
                v-else-if="checkPageRole(item.meta.roles)"
                :index="item.name || item.path"
                :key="item.name">
                <template slot="title">
                    <span v-if="item.meta && item.meta.title">
                        {{ item.meta.title }}
                    </span>
                </template>

                <template
                    v-for="child in item.children"
                    v-if="!child.hidden">
                    <sidebar-item
                        v-if="child.children && child.children.length > 0"
                        :is-nest="true" class="nest-menu"
                        :routes="[child]"
                        :key="child.path">
                    </sidebar-item>
                    <router-link
                        v-else
                        :to="child.path"
                        :key="child.name">
                        <el-menu-item :index="child.path">
                            <span v-if="child.meta && child.meta.title">{{ child.meta.title }}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>

        </template>
    </div>
</template>

<script src="./index"></script>
<style src="./sidebarItem.scss" lang="scss" scoped></style>
