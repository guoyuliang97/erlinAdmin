<template>
    <div class="sameContent">
        <div>
            <p class="contentTitle">管理员管理</p>
            <p>一个管理员可以有多个角色组,左侧的菜单根据管理员所拥有的权限进行生成</p>
        </div>
        <div class="sameMargin">
            <el-button type="success" :disabled="isDisab" @click="addAdmin">添加<i class="el-icon-plus"></i></el-button>
            <el-button :disabled="isChoose" @click="deletAdmin" type="danger"><i class="el-icon-delete"></i>删除</el-button>
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
                    :selectable="selectable"
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                fixed
                prop="userId"
                label="ID"
                >
                </el-table-column>
                <el-table-column
                prop="username"
                label="账户"
                >
                </el-table-column>
                <el-table-column
                label="状态"
                >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.status == 1? '正常':'' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100"
                style="z-index:1"
                >
                <template slot-scope="scope">
                    <el-button v-if="scope.row.userId != 1"  @click="remake(scope.row)" type="text">重置密码</el-button>
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
        <el-dialog title="修改管理员信息" width="40%"  :modal-append-to-body='false' :visible.sync="dialogFormVisible2" center>
            <el-form :label-position="labelPosition" :model="form2" >
                <el-form-item label="账户">
                    <el-input type="text" @blur="checkName(form2.name)" v-model="form2.name" style="width:220px"></el-input>
                </el-form-item>
               <el-form-item label="密码">
                    <el-input type="password" v-model="form2.password" style="width:220px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="abolish">取 消</el-button>
                <el-button type="primary" @click="remekeAdmin">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加管理员" width="40%"  :modal-append-to-body='false' :visible.sync="dialogFormVisible" center>
            <el-form :label-position="labelPosition" :model="form" >
                <el-form-item label="账户">
                    <el-input type="text" @blur="checkName(form.name)" v-model="form.name" style="width:220px"></el-input>
                </el-form-item>
               <el-form-item label="密码">
                    <el-input type="password" v-model="form.password" style="width:220px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="abolish">取 消</el-button>
                <el-button type="primary" @click="addAdministor">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data(){
        return {
            dialogFormVisible2:false,
            dialogFormVisible: false,
            form: {
                name: '',
                password:"",
            },
            form2: {
                name: '',
                password:"",
                rePassword:""
            },
            labelPosition:'center',
            formLabelWidth: '120px',
            tableData:[],
            currentPage:1,
            pageSize:10,
            total:0,
            isChoose:true,
            userId:'',
            deletArr:[],
            reg:/^[A-Za-z0-9]+$/
        }
    },
    computed:{
        isDisab(){
            var name = sessionStorage.getItem('name')
            if(name == 'admin'){
                return  false
            }else{
                return true
            }
        }
    },
    methods:{
        checkName(val){
            if(val && val == 'admin'){
                this.$message({type:'info',message:'账户名不能为admin!'})
                this.form = {}
                this.form2 = {}
            }
        },
        selectable(row,index){
            if(index == 0){
                return false
            }else{
                return true
            }
        },
        getAdmin(){
            this.$http.post('/user/list',{
                pageIndex: this.currentPage,
                pageSize: this.pageSize
            })
            .then(res=>{
                if(res.data.code == 200){
                    this.total = res.data.data.total
                    this.tableData = res.data.data.list
                }   
            })
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getAdmin()
        },
        handleSizeChange(val){
            this.pageSize = val
            this.getAdmin()
        },
        select(){
            var arr = this.$refs.multipleTable.selection
            if(arr.length){
                this.isChoose = false
            }else{
                this.isChoose = true
            }
            this.deletArr = arr
        },
        addAdmin(){
            this.dialogFormVisible = !this.dialogFormVisible
        },
        remake(v){
            if(sessionStorage.getItem('name') == 'admin'){
                this.dialogFormVisible2 = true
                this.userId = v.userId
            }else{
                this.$message({type:'info',message:'您没有权限操作重置密码，请联系管理员!'})
            }
            
        },
        remekeAdmin(){
            if(!this.form2.name || !this.reg.test(this.form2.name)){
                this.$message({type:'error',message:'请填写账户名字母或者数字'})
            }else if(!this.form2.password){
                this.$message({type:'error',message:'请填写密码'})
            }else{
                this.$http.post('/user/update',{
                    userId: this.userId,
                    username: this.form2.name,
                    password: this.form2.password
                })
                .then(res=>{
                    if(res.data.code == 200){
                        this.dialogFormVisible2 = false
                        this.form2 = {}
                        this.getAdmin()
                    }
                })
            }
        },
        addAdministor(){
            if(!this.form.name || !this.reg.test(this.form.name)){
                this.$message({type:'error',message:'请填写账户名字母或者数字!'})
            }else if(!this.form.password){
                this.$message({type:'error',message:'请输入密码!'})
            }else{
                let obj = {
                    username:this.form.name,
                    password:this.form.password
                }
                this.$http.post('/user/add', obj).then(res => {
                    if(res.data.code == 200){
                            this.dialogFormVisible = false
                            this.form = {}
                            this.getAdmin()
                        }
                    })
                }
        },
        abolish(){
            this.form = {}
            this.form2 = {}
            this.dialogFormVisible = false
            this.dialogFormVisible2 = false
        },
        deletAdmin(){
            var arr = []
            this.deletArr.forEach((item,index) =>{
                arr.push(item.userId)
            })
            this.$http.post('/user/delete',{
                userIdList:  arr
            })
            .then(res=>{
                if(res.data.code == 200){
                    this.isChoose = true
                    this.deletArr = []
                    this.getAdmin()
                }
            })
        }
    },
    mounted(){
       this.getAdmin()
    }
}
</script>

<style>

</style>