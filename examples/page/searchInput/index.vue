<template>
    <div class="layout-content">
        <div class="demo-box">
            <div class="title">
                简单输入框组件 from Main Frame {{ foo }}
            </div>
            <div class="demo-content">
                <div class="demo-input">
                    <simple-input v-model="value" placeholder="请输入字符"/>
                </div>
                <div class="demo-params">
                    <div class="demo-title">
                        Input Attributes
                    </div>    
                    <table class="demo-table">
                        <thead>
                            <tr>
                                <td>参数</td>
                                <td>说明</td>
                                <td>类型</td>
                                <td width="120px">默认值</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>value/v-model</td>
                                <td>绑定值</td>
                                <td>String / Object</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>placeholder</td>
                                <td>输入框占位文本</td>
                                <td>String</td>
                                <td>请输入</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="demo-box">
            <div class="title">
                弹窗组件
            </div>
            <div class="demo-content">
                <el-button @click="dialog.visible = true">Show</el-button>
                <simple-dialog v-model="dialog.visible" />
            </div>
        </div>

        <div class="demo-box">
            <div class="title">
                复杂输入框组件
            </div>
            <div class="demo-content">
                <div class="demo-input">
                    <query-drop-box v-model="complexVal" :data="dropBoxOpts"/>
                </div>
                <div class="demo-params">
                    <div class="demo-title">
                        Input Attributes
                    </div>    
                    <table class="demo-table">
                        <thead>
                            <tr>
                                <td>参数</td>
                                <td>说明</td>
                                <td>类型</td>
                                <td width="120px">默认值</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>value/v-model</td>
                                <td>绑定值</td>
                                <td>String / Object</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>placeholder</td>
                                <td>输入框占位文本</td>
                                <td>String</td>
                                <td>请输入</td>
                            </tr>
                            <tr>
                                <td>multiple</td>
                                <td>是否多选</td>
                                <td>Boolean</td>
                                <td>false</td>
                            </tr>
                            <tr>
                                <td>popoverPosition</td>
                                <td>下拉窗体显示位置</td>
                                <td>String</td>
                                <td>bottom-start</td>
                            </tr>
                            <tr>
                                <td>data</td>
                                <td>参数对象</td>
                                <td>Object</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>size</td>
                                <td>下拉窗体大小</td>
                                <td>String</td>
                                <td>normal</td>
                            </tr>
                            <tr>
                                <td>beforeEnter</td>
                                <td>校验函数</td>
                                <td>Function</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>showAddBtn</td>
                                <td>显示新增按钮</td>
                                <td>Boolean</td>
                                <td>false</td>
                            </tr>
                            <tr>
                                <td>addBtnText</td>
                                <td>新增按钮文本</td>
                                <td>String</td>
                                <td>新增</td>
                            </tr>
                            <tr>
                                <td>addHandler</td>
                                <td>新增回调函数</td>
                                <td>Function</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>rowItem</td>
                                <td>传入的行对象（用于动态行编辑）</td>
                                <td>Object</td>
                                <td>{}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style src="./index.scss" scoped lang="scss"></style>
