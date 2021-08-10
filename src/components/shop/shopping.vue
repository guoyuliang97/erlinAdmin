<template>
  <div class="sameContent">
      <p class="contentTitle">商品模板管理</p>
      <div class="sameMargin sameLeft">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="模板名称">
                  <el-input v-model="formInline.goodsName" ></el-input>
              </el-form-item>
              <el-form-item label="商户id">
                  <el-input v-model="formInline.storeId" ></el-input>
              </el-form-item>
              <el-form-item label="分类id">
                <el-select v-model="formInline.region">
                  <el-option v-for="(item,index) in fenleiList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品指导价格 max">
                  <el-input v-model="formInline.guidePriceMax" ></el-input>
              </el-form-item>
              <el-form-item label="	商品指导价格 min">
                  <el-input v-model="formInline.guidePriceMin" ></el-input>
              </el-form-item>
              <el-form-item label="模板状态">
                  <el-select v-model="formInline.isDelete">
                    <el-option v-for="(item,index) in stateList" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="创建时间">
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
      <div>
        <el-button @click="addShop" type="primary">新增模板<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>
      <div class="marginTm">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="创建者名称">
                    <span>{{ props.row.creatorInfo.creatorName }}</span>
                  </el-form-item>
                  <el-form-item label="创建者mid">
                    <span>{{ props.row.creatorInfo.creatorMid }}</span>
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <span>{{ props.row.creatorInfo.ctime  }}</span>
                  </el-form-item>
                  <el-form-item label="商品别名">
                    <span>{{ props.row.creatorInfo.goodsAs  }}</span>
                  </el-form-item>
                  <el-form-item label="商户定义价格">
                    <span>{{ props.row.creatorInfo.goodsPrice }}</span>
                  </el-form-item>
                  <el-form-item label="商品备注">
                    <span>{{ props.row.creatorInfo.goodsRemark }}</span>
                  </el-form-item>
                  <el-form-item label="商品排序号">
                    <span>{{ props.row.goodsRemark.goodsSeq }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ props.row.goodsDesc }}</span>
                  </el-form-item>
                  <el-form-item label="商品状态">
                    <el-tag :type="props.row.goodsRemark.onSale  == 1? 'success':'info'">{{ props.row.goodsRemark.onSale  == 1? '已上架':'未上架' }}</el-tag>
                  </el-form-item>
                  <el-form-item label="	商品图片">
                    <div class="imgBox">
                      <Loadimg :imgSrc="props.row.goodsRemark.goodsImg "></Loadimg>
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="商品ID"
              prop="id">
            </el-table-column>
            <el-table-column
              label="商品名称"
              prop="goodsName">
            </el-table-column>
            <el-table-column
              label="分类id"
             >
              <template slot-scope="scope">
                <p>{{scope.row.goodsCategoryVo.id}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="分类名称"
              >
              <template slot-scope="scope">
                <p>{{scope.row.goodsCategoryVo.name}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="生产厂家"
              prop="goodsBrand">
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="ctime">
            </el-table-column>
            <el-table-column
              label="商品规格"
              prop="goodsSpec">
            </el-table-column>
            <el-table-column
              label="商品计量单位"
              prop="goodsUnit">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="180"
            style="z-index:1"
            >
            <template slot-scope="scope" class="flexStart">
              <el-button type="text"  size="mini">下架</el-button>
              <el-button type="text"  size="mini">上架</el-button>
              <el-button type="text"  size="mini">删除</el-button>
              <el-button type="text"  size="mini">修改</el-button>
            </template>
            </el-table-column>
          </el-table>
      </div>
      <div class="sameMargin" style="text-align:right">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog
        title="商品模板"
        :visible.sync="isShop"
        width="55%"
        :modal-append-to-body="false"
        >
        <el-form ref="form" :model="shopForm" :inline="true"  label-position="left" >

          <el-form-item label="	商品名称">
            <el-input class="input_width" type="text" maxlength="20" v-model="shopForm.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品别名">
            <el-input class="input_width"  maxlength="20"  v-model="shopForm.goodsAs"></el-input>
          </el-form-item>
          <el-form-item label="分类id">
            <el-select v-model="shopForm.categoryId" >
              <el-option v-for="(item,index) in fenleiList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生产厂商">
            <el-input class="input_width" v-model="shopForm.goodsBrand"></el-input>
          </el-form-item>
          <el-form-item label="	指导价格">
            <el-input class="input_width" v-model="shopForm.guidePrice"></el-input>
          </el-form-item>
          <el-form-item label="商品备注">
            <el-input class="input_width" v-model="shopForm.goodsRemark"></el-input>
          </el-form-item>
          <el-form-item label="	商户新增商品（排序号）">
            <el-input class="input_width" v-model="shopForm.goodsSeq"></el-input>
          </el-form-item>
          <el-form-item label="	商品规格(350ml 35码 L)">
            <el-input class="input_width"  v-model="shopForm.goodsSpec"></el-input>
          </el-form-item>
          <el-form-item label="商品计量单位 (瓶/件/套/包)">
            <el-input class="input_width" v-model="shopForm.goodsUnit"></el-input>
          </el-form-item>
          <el-form-item label="	商品描述">
            <el-input class="input_width" v-model="shopForm.goodsDesc"></el-input>
          </el-form-item>
          <div>
            <el-form-item label="商品图片">
              <div @click="cropperModel = true">
                <Loadimg type="img" v-if="shopForm.goodsImg" class="avatar" :imgSrc="shopForm.goodsImg"></Loadimg>
                <i v-else  class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </el-form-item>
          </div>
          <div class="textCenter">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button @click="abolish">取消</el-button>
            </el-form-item>
          </div>

        </el-form>
      </el-dialog>
      <el-dialog
          title="裁切封面"
          :visible.sync="cropperModel"
          width="950px"
          center
          :modal-append-to-body="false"
         >
       <cropper-image
           :Name="cropperName"
           @uploadImgSuccess = "handleUploadSuccess"
           ref="child">
       </cropper-image>
      </el-dialog>
  </div>
</template>

<script>
import CropperImage from "../../public/fileCut.vue"
import Loadimg from '../../public/loadingImg.vue'
export default {
  data(){
    return {
      formInline:{

      },
      fenleiList: [
        {label: '1',value: 1},
        {label: '2',value: 2}
      ],
      stateList:[
        {label: '已删除',value: false},
        {label: '已上架',value: true}
      ],
      tableData:[],
      currentPage:1,
      pageSize: 10,
      total:0,
      isShop:false,
      shopForm:{},
      cropperModel:false,
      cropperName:'shangchaun'
    }
  },
  components:{
    Loadimg,
    CropperImage
  },
  methods:{
    getShop(){
      var params = {
          categoryId: this.formInline.categoryId,
          goodsName: this.formInline.goodsName,
          guidePriceMax: this.formInline.guidePriceMax,
          guidePriceMin: this.formInline.guidePriceMin,
          isDelete: this.formInline.isDelete,
          storeId: this.formInline.storeId
      }
      if(this.formInline.time){
        params.ctimeMax = this.formInline.time[1]
        params.ctimeMin = this.formInline.time[0]
      }
      this.$post('/sys/goods/manage/list',params).then(res=>{
        console.log(res)
          var data = res.data.data
          this.tableData = data.list
          this.total = data.total
      })
    },
    addShop(){
      this.isShop = true
    },
    handleCurrentChange(e){
      console.log(e)
      this.currentPage = e
    },
    onSubmit(){
      var params = {
        param:{
          "categoryId": this.shopForm.categoryId,
          "goodsAs": this.shopForm.goodsAs,
          "goodsBrand": this.shopForm.goodsBrand,
          "goodsDesc": this.shopForm.goodsDesc,
          "goodsImg": this.shopForm.goodsImg,
          "goodsName": this.shopForm.goodsName,
          "goodsRemark": this.shopForm.goodsRemark,
          "goodsSeq": parseInt(this.shopForm.goodsSeq),
          "goodsSpec": this.shopForm.goodsSpec,
          "goodsUnit": this.shopForm.goodsUnit,
          "guidePrice": Number(this.shopForm.guidePrice) ,
        }
      }
      this.$post('/sys/goods/manage/add',params).then(res=>{
        this.abolish()
        this.$message({
          message: '创建成功',
          type: 'success'
        })
      })
    },
    handleUploadSuccess(res){
      console.log(res)
      this.shopForm.goodsImg = res.url
      this.cropperModel = false
    },
    abolish(){
      this.isShop = false
      this.shopForm = {}
    }
  },
  mounted(){
    this.getShop()
  }
}
</script>

<style scoped>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .input_width{
    width:200px
  }
  .avatar-uploader .el-upload {

      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      border: 1px dashed #d9d9d9;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
