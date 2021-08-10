<template>
    <div>
        <img :src="img" v-if="type == 'bgImg'" :onerror="defaultImg" class="bgImg">
        <img :src="img" v-if="type == 'img'" :onerror="defaultImg"  class="bgImg">
    </div>
</template>

<script>
export default {
    props:['type','imgSrc'],
    data(){
        return{
            img: '',
            defaultImg: 'this.src="' + require('../../static/bgImg/logo.png') + '"'
        }
    },
    watch:{
      imgSrc(){
        this.changeImg()
      }
    },
    methods:{
        changeImg(){
          this.img = this.imgSrc ? this.imgSrc : this.defaultImg
        }
    },
    mounted(){
        this.changeImg()
    }
}
</script>

<style>
.bgImg{
    width:100%;
    height:100%;
    object-fit: contain;

}
</style>
