<template>
    <div>
        <el-container class="app-wrapper">
            <!-- <el-header>Header</el-header> -->
            <el-container>
                <el-aside width="200px">
                    <sidebar 
                        activeTextColor="#FBBE35">
                    </sidebar>
                </el-aside>
                <el-container>
                    <el-main class="app-main">
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script src="./index"></script>
<style scoped lang="scss" src="./index.scss" />

