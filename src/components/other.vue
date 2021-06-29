<template>
    <div class="sameContent">
        <div>
            <p class="contentTitle">附件管理</p>
            <p>主要用于管理上传到又拍云的数据或上传至本服务的上传数据</p>
        </div>
        <div class="sameMargin">
            <el-button @click="isShow" type="success"><i class="el-icon-plus"></i>添加</el-button>
            <el-button type="danger"><i class="el-icon-delete"></i>删除</el-button>
        </div>
        <div> 
            <el-table
                :data="tableData"
                ref="multipleTable"
                border
                highlight-current-row
                @select="select"
                @select-all="select"
                style="width:100%"
                >
                <el-table-column
                    fixed
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                fixed
                prop="date"
                label="日期"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                >
                </el-table-column>
                <el-table-column
                prop="province"
                label="省份"
                >
                </el-table-column>
                <el-table-column
                prop="city"
                label="市区"
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址"
                >
                </el-table-column>
                <el-table-column
                prop="zip"
                label="邮编"
                >
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100"
                style="z-index:1"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" >查看</el-button>
                    <el-button type="text">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="sameMargin" style="text-align:right">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData:[],
            currentPage:1
        }
    },
    methods:{
        handleCurrentChange(){

        },
        handleSizeChange(){

        },
        select(){
            
        },
        isShow(){

        }

    },
    mounted(){
       
    }
}
</script>

<style>

</style>