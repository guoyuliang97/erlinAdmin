<template>
  <div>
     <Head style="background-color:#008489" v-on:toSetting="homeRouter('4-2','/configsys','系统配置文件')" v-on:lookSystem="homeRouter('2-3-1','/systemmsg','系统消息')" v-on:lookPerson="homeRouter('2-3-2','/personmsg','个人消息')"></Head>
     <div class="menu flexStart">
        <div class="nav">
          <el-menu
              :default-active="defautIndex"
              class="el-menu-vertical-demo"
              background-color="#008489"
              text-color="#fff"
              active-text-color="#ff5511">
              <div v-for="(item,index) in menuList">
                 <div v-if="!item.children">
                   <el-menu-item :index="item.index" @click="changeRouter(item,index)">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                  </el-menu-item>
                 </div>
                 <div v-if="item.children">
                  <el-submenu :index="item.index">
                    <template slot="title">
                      <i :class="item.icon"></i>
                      <span>{{item.name}}</span>
                    </template>
                      <el-menu-item style="min-width:0;"  v-for="(items,indexs) in item.children " :key="indexs" @click="changeRouter(items,indexs)" :index="items.index">
                        <i :class="items.icon"></i>
                        <span slot="title">{{items.name}}</span>
                      </el-menu-item>
                  </el-submenu>
                 </div>
              </div>
          </el-menu>
        </div>
        <div class="centent">
          <div class="nav_tags">
            <div class="tags samecolor" v-for="(item,index) in tagsArr" :style="{backgroundColor:tagId==index?'rgba(0,0,0,.1)':'white',transition:'all .2s linear'}">
              <p @click="goRouter(item,index)" >{{item.name}}</p>
              <p class="del_tags" v-show="index" @click="delTags(index,index)"><i class="el-icon-close"></i></p>
            </div>
          </div>
          <div style="contentView">
            <router-view></router-view>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import Head from '../public/head'
export default {
  name: 'home',
  data () {
    return {
      api: this.GLOBAL.baseURL,
      isCollapse:true,
      tagsArr:[
        {
          name:'控制台',
          router:'/control',
          index:'1'
        }
      ],
      menuList:[
        {
          name:'控制台',
          router:'/control',
          index:'1',
          icon:'el-icon-menu'
        },
        {
          name:'店铺审核',
          router:'/message',
          index:'2',
          icon:'el-icon-chat-line-round'
        },
        {
          name:'商品模板',
          router:'/shopping',
          index:'3',
          icon:'el-icon-chat-line-round'
        },
        {
          name:'权限管理',
          router:'/control',
          index:'3',
          icon:'el-icon-s-operation',
          children:[
              {
                name:'管理员管理',
                router:'/admin',
                index:'3-1',
                icon:'el-icon-user'
              },
              // {
              //   name:'管理员日志',
              //   router:'/authLog',
              //   index:'3-2',
              //   icon:'el-icon-user'
              // },
              // {
              //   name:'角色组',
              //   router:'/Character',
              //   index:'3-3',
              //   icon:'el-icon-user'
              // },
              // {
              //   name:'规则管理',
              //   router:'/ruler',
              //   index:'3-4',
              //   icon:'el-icon-s-tools'
              // },
          ]
        },
        {
          name:'商品分类',
          router:'/fenlei',
          index:'4',
          icon:'el-icon-chat-line-round'
        },
        // {
        //   name:'常规管理',
        //   router:'/control',
        //   index:'4',
        //   icon:'el-icon-s-operation',
        //   children:[
        //     {
        //       name:'个人配置',
        //       router:'/person',
        //       index:'4-1',
        //       icon:'el-icon-s-custom'
        //     },
        //     // {
        //     //   name:'系统配置',
        //     //   router:'/setting',
        //     //   index:'4-2',
        //     //   icon:'el-icon-setting'
        //     // },
        //     // {
        //     //   name:'附件管理',
        //     //   router:'/other',
        //     //   index:'4-3',
        //     //   icon:'el-icon-s-promotion'
        //     // },
        //   ]
        // }
      ],
      tagId:0,
      activeIndex:1,
      defautIndex:'1'
    }
  },
  components:{
    Head
  },
  methods:{
    goRouter(item,index){
      this.tagId = index
      this.$router.push(item.router)
      this.defautIndex = item.index
      sessionStorage.setItem('index',this.tagId)
      sessionStorage.setItem('defautIndex',this.tagId)
    },
    delTags(item,index){
      if(index == (this.tagsArr.length-1) && index != 0){
        this.tagsArr.splice(index,1)
        this.tagId = this.tagsArr.length-1
      }else{
        this.tagsArr.splice(index,1)
        this.tagId -= 1
      }
       this.$router.push(this.tagsArr[this.tagId].router)
       this.defautIndex = this.tagsArr[this.tagId].index
       sessionStorage.setItem('nav',JSON.stringify(this.tagsArr) )
       sessionStorage.setItem('index',this.tagId)
       sessionStorage.setItem('defautIndex',this.defautIndex)
    },
    changeRouter(item,index){
      if(item.index != this.defautIndex){
        var num = -1
        for(var i = 0; i< this.tagsArr.length;i++){
          if(this.tagsArr[i].name == item.name){
            num = i
          }
        }
          if(num != -1){
            this.defautIndex = this.tagsArr[num].index
            this.tagId  = num
          }else{
            this.defautIndex = item.index
            this.tagsArr.push({name:item.name,router:item.router,index:item.index})
            this.tagId = this.tagsArr.length -1
          }
            this.$router.push(item.router)

          sessionStorage.setItem('nav',JSON.stringify(this.tagsArr))
          sessionStorage.setItem('index',this.tagId)
          sessionStorage.setItem('defautIndex',this.defautIndex)
      }

    }

  },
  mounted(){
    var nav = sessionStorage.getItem('nav')
    var index = sessionStorage.getItem('index')
    var defoudIndex = sessionStorage.getItem('defautIndex')
    if(nav != '' && nav != '{}' && nav != null){
      this.tagsArr = JSON.parse(nav)
      this.defautIndex = defoudIndex
      this.tagId = index
      this.$router.push(this.tagsArr[this.tagId].router)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu{
  position:fixed;
  top:60px;
  left:0;
  bottom:0;
  right:0;
}
.nav{
  background-color:#008489;
  width:15%;
  height:100%;
  max-width:200px;
  min-width:150px;
  text-align: left;
}
.centent{
  width:100%;
  height:100%;
   position: relative;
  overflow: auto;
  overflow-x: hidden;
}
.menu_title{
  background-color:#008489;
  padding: 20px;
  color:#fff;
}
.nav_tags{
  width: 100%;
  height: 40px;
  box-shadow:0 2px 3px -1px #dcdcdc;
  padding-right: 15px;
  text-align: left;
  position: fixed;
  z-index: 999;
  background-color: #fff;
}
.tags_style{
  height: 100%;
  line-height: 40px;
  border: none;
  border-radius: 0
}
.tags{
  height: 40px;
  line-height: 40px;
  padding-left: 5px;
  padding-right: 5px;
  float: left;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
}
.tags:hover{
   box-shadow:0 2px 3px -1px #dcdcdc;
   background-color:rgba(0,0,0,.1) !important;
}
.del_tags{
  cursor: pointer;
  margin-left: 5px;
  border-radius: 50%;
}
.del_tags:hover{
  color: black;
}
.contentView{
  width:100%;
  height:100%;
}
</style>
