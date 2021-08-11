<template>
  <div class="sameContent">

   <!-- <div>
      <el-cascader
       :props="props"
       >
       </el-cascader>
    </div> -->
    <p class="contentTitle">已有商品分类</p>
    <div class="marginTm">
      <el-tree :data="fenleiList" :props="defaultProps" @node-click="handleNodeClick">
      </el-tree>
    </div>
     <div>
       <el-button @click="addShop" type="primary">新增分类<i class="el-icon-upload el-icon--right"></i></el-button>
     </div>
    <el-dialog
      title="商品模板"
      :visible.sync="isFenlei"
      width="55%"
      :modal-append-to-body="false"
      >
      <el-form ref="form" :model="form" :inline="true"  label-position="left" >
        <el-form-item label="分类名称">
          <el-input class="input_width" type="text" maxlength="20" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="	商品编号">
          <el-input class="input_width"  maxlength="20"  v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="	分类上级id">
          <el-select v-model="form.parentId" >
            <el-option v-for="(item,index) in fenleiList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="	排序号">
          <el-input class="input_width" v-model="form.categorySeq"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="分类图片">
            <div @click="cropperModel = true">
              <Loadimg type="img" v-if="form.categoryLogo" class="avatar" :imgSrc="form.categoryLogo"></Loadimg>
              <i v-else  class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-form-item>
        </div>
        <div class="textCenter">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="abolish">取消</el-button>
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
  import CropperImage from "../public/fileCut.vue"
  import Loadimg from '../public/loadingImg.vue'
  export default {
    data(){
      return{
        isFenlei:false,
        options: [],
        props:{
          lazy: true,
          lazyLoad:(node,resolve) => {
          let nodes = [];
          let parentid = 0;
          if (node.value) {
            parentid = node.value;
          }
          this.$get('/sys/goods-category/' + parentid)
            .then((res) => {
              if(res.data.data != null){
                var data = res.data.data.children
                console.log(data)
                data.forEach(item => {
                  nodes.push({
                    label: item.name,
                    value: item.id,
                    children: item.children
                  })
                })
              }
              resolve(nodes);
            });

          }
        },
        fenleiList: [],
        defaultProps:
        {
           children: 'children',
           label: 'label'
        },
        form:{},
        cropperModel:false,
        cropperName:'shangchaun'
      }
    },
    components:{
      Loadimg,
      CropperImage
    },
    methods:{
      handleNodeClick(e){
        console.log(1)
        console.log(e)
        this.getNext(e.value)
      },
      getNext(value){
        var parentId = value
        this.$get('/sys/goods-category/' + parentId).then(res=>{
          if(res.data.data != null){
           var arr = []
           var data = res.data.data.children
           data.forEach(item => {
             arr.push({
             label: item.name,
               value: item.id,
               children: item.children
             })
           })
           this.fenleiList  = arr
          }

        })
      },
      onSubmit(){
        var params = {
            "categoryLogo": this.form.categoryLogo,
            "categorySeq": this.form.categorySeq,
            "code": this.form.code,
            "name": this.form.name,
            "parentId": this.form.parentId
        }
        params = JSON.stringify(params)
        this.$post('/sys/goods-category/add',params).then(res=>{
          this.getNext(0)
          this.abolish()
        })
      },
      handleUploadSuccess(res){
        this.form.categoryLogo = res.url
        this.cropperModel = false
      },
      addShop(){
        this.isFenlei = true
      },
      abolish(){
        this.isFenlei = false
      }
    },
    mounted(){
      this.getNext(0)
    }
  }


</script>

<style scoped>

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
