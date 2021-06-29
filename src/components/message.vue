<template>
  <div class="sameContent" >
    <p class="contentTitle">留言管理</p>
    <p class="sameMargin" style="color:#999999">注：意向等级A,B,C,D 依次等级递减</p>
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
                <el-button type="primary" @click="getMessage">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="sameMargin">  
        <el-button :disabled="isChoose" @click="deletMessage" type="danger" icon="el-icon-delete" ></el-button>
        <el-button @click="exprot" type="primary">导出<i class="el-icon-download"></i></el-button>
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
                <el-button @click="remake(scope.row)" type="text">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="sameMargin" style="text-align:right">
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
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

        handleClick(row) {
         
        },
        select(){
            this.deletArr = this.$refs.multipleTable.selection
            if(this.deletArr.length){
                this.isChoose = false
            }else{
                this.isChoose = true
            }
        },
        handleSizeChange(val) {
           this.pageSize = val
           this.getMessage()
        },
        handleCurrentChange(val) {
          this.currentPage = val
           this.getMessage()
        },
         deletMessage(){
            var arr = []
            this.deletArr.forEach((item,index) =>{
                arr.push(item.messageId)
            })
            this.$http.post('/message/delete',{
                messageIdList: arr
            })
            .then(res=>{
                if(res.data.code == 200){
                    this.isChoose = true
                    this.deletArr = []
                    this.getMessage()
                }
            })
        },
        getMessage(){
            this.$http.post('/message/list',{
                telephone: this.formInline.telephone,
                startTime: this.formInline.time != null? this.formInline.time[0] +' '+ '00:00:00':'',
                endTime:this.formInline.time != null? this.formInline.time[1] +' '+ '23:59:59':'',
                pageIndex: this.currentPage,
                pageSize: this.pageSize
            }) 
            .then(res=>{
                if(res.data.code == 200){
                    this.tableData = res.data.data.list
                    this.total = res.data.data.total
                }
            })
        },
        exprot(){
            this.$http({
                method:'post',
                url:'/message/export',
                responseType:'blob',
                data:{
                    telephone: this.formInline.telephone,
                    startTime: this.formInline.time != null? this.formInline.time[0] + ' '+'00:00:00':'',
                    endTime: this.formInline.time != null? this.formInline.time[1] + ' '+'23:59:59':'',
                },
            })
            .then(res=>{
              
                    // let blob = new Blob([res], {type: "application/vnd.ms-excel"}); // res就是接口返回的文件流了

                    // let objectUrl = URL.createObjectURL(blob);

                    // window.location.href = objectUrl;
                    
                        const content = res
                        const blob = new Blob([content])
                        const fileName = '导出信息.xlsx'
                        if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                        } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                        }
             
            })


            // this.$http.post('/message/export',{
            //     telephone: this.formInline.telephone,
            //     startTime: this.formInline.time != null? this.formInline.time[0] + ' '+'00:00:00':'',
            //     endTime: this.formInline.time != null? this.formInline.time[1] + ' '+'23:59:59':'',
            // })
            // .then(res=>{
            //      this.downLoadXls(res.data.data,'留言列表')
            // })
        },
        downLoadXls(data, filename) {
        //var blob = new Blob([data], {type: 'application/vnd.ms-excel'})接收的是blob，若接收的是文件流，需要转化一下
            if (typeof window.chrome !== 'undefined') {
                // Chrome version
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(data);
                link.download = filename;
                link.click();
            } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // IE version
                var blob = new Blob([data], { type: 'application/force-download' });
                window.navigator.msSaveBlob(blob, filename);
            } else {
                // Firefox version
                var file = new File([data], filename, { type: 'application/force-download' });
                window.open(URL.createObjectURL(file));
            }
        },
        remake(v){
            this.dialogFormVisible = true
            this.messageId = v.messageId
        },
        sendMess(){
            if(this.form.goOn != '' && this.form.Level){
                this.$http.post('/message/update',{
                    messageId: this.messageId,
                    grade: this.form.Level,
                    followUpStatus: this.form.goOn
                })
                .then(res=>{
                    if(res.data.code == 200){
                        this.dialogFormVisible = false
                        this.form ={}
                        this.getMessage()
                    }
                })
            }else{
                this.$message({type:'info',message:'请选择是否跟进或者意向等级!'})
            }
        }
    },
    mounted(){
        this.getMessage()
    }
}
</script>

<style>

</style>