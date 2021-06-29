<template>
    <div>
        <img :src="img" v-if="type == 'bgImg'" class="bgImg">
    </div>
</template>

<script>
export default {
    props:['type','img'],
    data(){
        return{

        }
    },
    methods:{
        changeImg(){

        }
    },
    mounted(){

    }
}
</script>

<style>
.bgImg{
    width:100%;
    height:100%;
    object-fit: cover;
    
}
</style>