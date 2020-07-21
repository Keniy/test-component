<template>
    <div>
        <el-popover ref="queryDropBox" :width="popoverWidth" :placement="popoverPosition" v-model="visible" trigger="manual">
            <div slot="reference" ref="inputLayout" class="query-dropbox-layout" :class="size">
                <template v-if="multiple">
                    <template v-if="hasChilds">
                        <el-popover
                        width="100"
                        trigger="click"
                        ref="popover"
                        placement="top">
                        <div class="tag-popover">
                            <el-tag v-for="(tag, index) in selectList" :key="index" :closable="true" type="primary" @close="handleClose($event, tag, index)">{{tag.label2}}</el-tag>
                        </div>
                        </el-popover>
                        <el-button class="tag-btn-active" type="primary" size="mini" v-popover:popover>{{multipleText}}</el-button>
                    </template>
                    <template v-else>
                        <el-tag class="tag-active" v-for="(tag, index) in selectList" :key="index" :closable="true" type="primary" @close="handleClose($event, tag, index)">
                            {{ tag.label2 }}
                        </el-tag>
                    </template>
                </template>
                <template v-else>
                    <el-tag ref="tag" class="tag-active" v-for="(tag, index) in selectList" :key="index" :closable="true" type="primary" @close="handleClose($event, tag, index)">
                        {{ tag.label2 && tag.label2.length * 12 + 40 >= currentTagWidth ? tag.label2.substring(0, (currentTagWidth - 60) / 12) + '..' : tag.label2}}
                    </el-tag>
                </template>
                <el-input
                    v-model="codeOrName"
                    :placeholder="placeholder"
                    ref="input"
                    @click.native="autoSearch"
                    @keydown.native="handleKeydown"
                    @compositionstart="isLock=true"
                    @compositionend="isLock=false"
                    @input="compositioninput"
                    @blur="handleBulr"
                    @focus="handleFocus">
                </el-input>
            </div>
            <template>
                <el-table ref="queryDropTable" :data="tableData" style="width: 100%;" fit row-key="id" v-if="columnList.length > 0" :max-height="250"
                    @row-click="handleRowClick" @selection-change="handleSelectionChange" highlight-current-row>
                    <el-table-column type="selection" reserve-selection v-if="multiple" align="center"></el-table-column>
                    <el-table-column label="#" prop="label1" align="center" width="40">
                        <template slot-scope="scope">
                            {{ scope.$index +1 }}
                        </template>
                    </el-table-column>
                    <el-table-column v-for="(column, index) in columnList" :key="index" :label="column.label" :prop="column.property" align="center">
                    </el-table-column>
                </el-table>

                <el-row class="add-btn" v-if="showAddBtn">
                    <el-button size="small" @click="handleAdd">{{ addBtnText }}</el-button>
                </el-row>

                <search-page
                    @size-change="handleSizeChange"
                    @current-change="search"
                    :pageSizes="pageSizes"
                    :pageSize="pageSize"
                    :currentPage="currentPage"
                    :total="total">
                </search-page>

                <loading v-if="loading" @loadingRefresh="onRefresh" :loadingText="loadingText"></loading>
            </template>
        </el-popover>
    </div>
</template>

<script src='./js/index.js'></script>

<style lang="scss">
  .tag-active {
    margin-top: 6px;
    margin-left: 5px;
    z-index: 2000;
  }

  .tag-btn-active {
    margin: 3px 0 3px 15px;
  }

  .tag-popover {
    text-align: left;
  }

  .tag-popover .el-tag{
    margin-top: 3px;
    margin-left: 5px;
  }

  .tag-indent {
    text-indent: 55px;
  }
  .el-tag {
    height: 24px !important;
    border-radius: 0;
    line-height: 24px !important;
  }
  .query-dropbox-layout{
    width: 100%;
    max-width: 416px;
    position: relative;
    display: flex;
    height: 40px;
    background-color: #fff;
    background-image: none;
    border: #dcdfe6 solid 1px;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    transition: border-color 0.2s cubic-bezier(.645,.045,.355,1);
    overflow: hidden;
  }

  .query-dropbox-layout .el-input .el-input__inner {
    border: none;
  }

  .is-error .query-dropbox-layout{
    border-color: #ff4949;
  }

  .normal {
    height: 40px;
  }

  .small {
    height: 32px;
    line-height: 32px;
    .el-input .el-input__inner {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
    }
    .tag-active {
        margin-top: 3px;
    }
  }
  
  .add-btn {
      width: 100%;
      text-align: center;
      margin-top: 4px;
      .el-button {
          min-width: 100px;
      }
  }
</style>