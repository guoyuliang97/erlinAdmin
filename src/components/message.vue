<template>
  <div class="sameContent" >
    <p class="contentTitle">商家审核管理</p>
    <div class="sameMargin sameLeft">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="电话">
                <el-input v-model="formInline.telephone" placeholder="电话"></el-input>
            </el-form-item>
            <el-form-item label="申请时间">
                <el-date-picker
                    v-model="formInline.time"
                    type="daterange"
                    align="right"
                    value-format="yyyy-MM-dd"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                   >
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
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form >
                  <el-form-item label="店铺名称:">
                    <span>{{ scope.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="负责人姓名:">
                    <span>{{ scope.row.directorName }}</span>
                  </el-form-item>
                  <el-form-item label="负责人身份证:">
                    <span>{{ scope.row.directorCart }}</span>
                  </el-form-item>
                  <el-form-item label="负责人电话:">
                    <span>{{ scope.row.contactNumber }}</span>
                  </el-form-item>
                  <el-form-item label="营业执照号:">
                    <span>{{ scope.row.businessLicenseCode }}</span>
                  </el-form-item>
                  <el-form-item label="店铺地址:">
                    <span>{{ scope.row.detailAddress }}</span>
                  </el-form-item>
                  <el-form-item label="营业执照:">
                    <div class="imgBox marginBtm">
                      <loadimg type="img" :imgSrc="scope.row.businessLicenseImg "></loadimg>
                    </div>
                  </el-form-item>
                  <el-form-item label="店铺LOGO:">
                    <div class="imgBox">
                      <loadimg type="img" :imgSrc="scope.row.signBoardImg "></loadimg>
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>


            <el-table-column

            prop="name"

            label="商户名称"
            >
            </el-table-column>
            <el-table-column

            prop="directorName"
            label="负责人姓名"
            >
            </el-table-column>
            <el-table-column
            prop="directorCart"
            label="负责人身份证号"
            >
            </el-table-column>
            <el-table-column
            prop="contactNumber"
            label="联系电话"
            >

            </el-table-column>
            <el-table-column
            prop="detailAddress"
            label="详细地址"
            >

            </el-table-column>

            <el-table-column
            width="150"
            label="商铺logo"
            >
              <template slot-scope="scope" >
                <Loadimg type="img" class="imgBox"  :imgSrc="scope.row.signBoardImg"></Loadimg>
              </template>
            </el-table-column>
            <el-table-column
            width="100"
            label="审核状态"
            >
            <template slot-scope="scope">
                <el-tag :type="scope.row.authStatus == 2?'success':scope.row.authStatus == '1'?'warning':scope.row.authStatus == '-1'?'danger':''">
                  {{ scope.row.authStatus == 0 ?  '未提交':   scope.row.authStatus == 1 ?'审核中':  scope.row.authStatus == 2 ?'审核通过': '审核不通过'}}
                </el-tag>
            </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="180"
            style="z-index:1"
            >
            <template slot-scope="scope" class="flexStart">
              <div v-if="scope.row.authStatus == 1">
                <el-button type="text" @click="agree" size="mini">通过</el-button>
                <el-button type="text" @click="unAgree" size="mini">拒绝</el-button>
              </div>
              <div v-if="scope.row.authStatus == 2">
                <el-button type="text" size="mini">已通过</el-button>
              </div>
              <div v-if="scope.row.authStatus == -1">
                <el-button type="text" size="mini">审核不通过</el-button>
              </div>
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
    
    <el-dialog title="审核详情"  :modal-append-to-body='false' :visible.sync="dialogFormVisible">

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendMess">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>

import Loadimg from '../public/loadingImg.vue'
export default {
    data(){
        return {
            dialogFormVisible:false,

            formInline:{
                telephone:'',
                time:null
            },
            tableData:[
            ],
            isChoose:true,
            currentPage:1,
            pageSize:10,
            total:0,
            messageId:'',
            deletArr:[],

        }
    },
    components:{
      Loadimg
   
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

        },
        lookMore(row){
          this.dialogFormVisible = !this.dialogFormVisible
        },
        unAgree(){ //拒绝
          this.$confirm('此操作将拒绝商家入驻申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',

          }).then(() => {

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });

        },
        agree(){ //同意
          this.$confirm('此操作将同意商家入驻申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',

          }).then(() => {

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
    },
    mounted(){
        this.getAudit()
    }
}
</script>

<style scoped>

</style>
