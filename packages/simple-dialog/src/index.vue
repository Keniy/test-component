<template>
    <div>
        <el-dialog :visible.sync="dialog.visible" width="40%" :title="dialog.title" @close="close">
            <el-input v-model="ruleForm.value" placeholder="请输入"></el-input>

            <div class="dialog-footer">
                <el-button @click="close" size="small">关闭</el-button>
                <el-button @click="submit" size="small" type="primary">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script src="./js/index"></script>

<style lang="scss" scoped>
.dialog-footer {
    margin: 10px 0;
}
</style>

