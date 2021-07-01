<template>
  <div class="sameContent" >
    <p class="contentTitle">商家审核管理</p>
    <div class="sameMargin sameLeft">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="电话">
                <el-input v-model="formInline.telephone" placeholder="电话"></el-input>
            </el-form-item>
            <el-form-item label="留言时间">
                <el-date-picker
                    v-model="formInline.time"
                    type="daterange"
                    align="right"
                    value-format="yyyy-MM-dd"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="sameMargin">
        <el-button :disabled="isChoose"  type="danger" icon="el-icon-delete" ></el-button>
        <el-button  type="primary">导出<i class="el-icon-download"></i></el-button>
    </div>
    <div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            border
            highlight-current-row
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
            prop="ip"
            label="IP"
            >
            </el-table-column>
            <el-table-column
            prop="telephone"
            label="电话"
            >
            </el-table-column>
            <el-table-column
            prop="linkman"
            label="姓名"
            >

            </el-table-column>
            <el-table-column
            prop="address"
            label="城市"
            >

            </el-table-column>
            <el-table-column
            label="选择项目"
            >
                <template slot-scope="scope">
                    <el-tag  v-for="(item,index) in scope.row.project.split('@')" >
                     <span v-if="item == 1||item == 5">电影票房预估</span>
                     <span v-if="item == 2||item == 6">备案查询</span>
                     <span v-if="item == 3||item == 7">定档查询</span>
                     <span v-if="item == 4||item == 8">出品方查询</span>
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
            prop="movieName"
            label="电影名称"
            >
            </el-table-column>
            <el-table-column
            prop="createTime"
            label="留言时间"
            >
            </el-table-column>
            <el-table-column
            prop="createTime"
            label="是否跟进"
            >
                <template slot-scope="scope">
                        <el-tag :type="scope.row.followUpStatus === 0?'danger':scope.row.followUpStatus === 1?'success':''">{{scope.row.followUpStatus === 0?'否':scope.row.followUpStatus === 1?'是':''}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
            prop="grade"
            label="意向等级"
            >
            <template slot-scope="scope">
                <el-tag :type="scope.row.grade == 'A'?'success':scope.row.grade == 'B'?'':scope.row.grade == 'C'?'warning':scope.row.grade == 'D'?'danger':''">{{scope.row.grade}}</el-tag>
            </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100"
            style="z-index:1"
            >
            <template slot-scope="scope">
                <el-button type="text">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="sameMargin" style="text-align:right">
        <el-pagination
      @size-change="handleSizeChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    </div>

    <el-dialog title="编辑" :modal-append-to-body='false' :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="是否跟进">
                <el-select v-model="form.goOn" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="意向等级" >
                <el-select v-model="form.Level" placeholder="请选择">
                    <el-option label="A级" value="A"></el-option>
                    <el-option label="B级" value="B"></el-option>
                     <el-option label="C级" value="C"></el-option>
                    <el-option label="D级" value="D"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendMess">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
    data(){
        return {
            dialogFormVisible2:false,
            form2:{},
            dialogFormVisible:false,
            form:{},
            formInline:{
                telephone:'',
                time:null
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }],

            },
            tableData:[
            ],
            isChoose:true,
            currentPage:1,
            pageSize:10,
            total:0,
            messageId:'',
            deletArr:[]
        }
    },
    computed:{

    },
    methods:{
        // 获取审核列表
        getAudit(){
          var params = {

          }
          this.$get('/sys/el-user/getAuditStore',params).then(res=>{
            if(res.data.code == 200){
               console.log(res)
               this.tableData = res.data.data.list 
               this.total = res.data.data.total
            }
          })
        },
        handleSizeChange(){
            
        },
        sendMess(){

        }
    },
    mounted(){
        this.getAudit()
    }
}
</script>

<style>

</style>
