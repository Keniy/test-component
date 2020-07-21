<template>
    <!-- :collapse="sidebar.opened" -->
    
    <el-menu
        mode="vertical"
        unique-opened
        :default-active="$route.path"
        :collapse="sidebar.opened"
        :background-color="backgroundColor"
        text-color="rgba(0,0,0,0.60)"
        :active-text-color="activeTextColor">
        <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
</template>

<script src="./index"></script>
<style src="./index.scss" lang="scss" scoped></style>
