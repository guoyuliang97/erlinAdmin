<template>
    <div class="sameContent">
        <div>
            <p class="contentTitle">角色组</p>
            <p>角色组可以有多个,角色有上下级层级关系,如果子角色有角色组和管理员的权限则可以派生属于自己组别下级的角色组或管理员</p>
        </div>
        <div class="sameMargin">
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
            
        }

    },
    mounted(){
       
    }
}
</script>

<style>

</style>