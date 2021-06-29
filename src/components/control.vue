<template>
  <div class="sameContent">
      <div>
          <p class="contentTitle">控制台</p>
          <p>用于展示当前系统中的统计数据、统计报表及重要实时数据</p>
      </div>
      <div class="sameMargin">
           <el-tabs v-model="editableTabsValue" type="card" >
                    <el-tab-pane
                        v-for="(item, index) in editableTabs"
                        :key="item.index"
                        :label="item.name"
                        :name="item.index"
                    >
                    </el-tab-pane>
                    <div class="flexBetween sameMargin" style="width:100%">
                        <div  v-for="(item,index) in information" class="flexStart">
                            <div  class="iconBox" :style="{backgroundColor: item.color}">
                                 <i :class="item.class"></i>
                            </div>
                            <div class="ceontentS">
                               <p class="contentTitle">{{item.number}}</p>
                               <p>{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                    <div style="overflow:hidden">
                      <div class="sameMargin" id="container" style="width:100%;height: 400px"></div>
                    </div>
                    <div class="flexBetween" style="width:100%">
                        <div v-for="(item,index) in contengList" class="information" :style="{backgroundColor:item.color}">
                            <p>{{item.name}}</p>
                            <p class="sameMargin contentTitle flexStart" style="text-align:left">
                               <span style="width:50%">
                                   {{item.number1}}
                               </span>
                                <span style="width:50%">
                                   {{item.number2}}
                               </span>
                            </p>
                            <p class=" flexStart" style="text-align:left;font-size:12px">
                               <span style="width:50%">
                                   {{item.title1}}
                               </span>
                                <span style="width:50%">
                                   {{item.title2}}
                               </span>
                            </p>

                            <span class="log" :style="{backgroundColor:item.spaColor}">
                                实时
                            </span>
                        </div>
                    </div>
                </el-tabs>
      </div>
  </div>
</template>

<script>
export default {

    data(){
        return {
            editableTabsValue:'1',
            editableTabs:[
                {
                    name:'控制台',
                    title:'控制台',
                    index:'1'
                }
            ],
            chnageTime:'',
            information:[
                {
                    class:'el-icon-user',
                    color:'green',
                    number:'35200',
                    name:'总会员数'
                },
                {
                    class:'el-icon-user',
                    color:'green',
                    number:'35200',
                    name:'总会员数'
                },
                {
                    class:'el-icon-user',
                    color:'green',
                    number:'35200',
                    name:'总会员数'
                },
                {
                    class:'el-icon-user',
                    color:'green',
                    number:'35200',
                    name:'总会员数'
                }
            ],
            contengList:[
                {
                    name:'分类统计',
                    number1:'1234',
                    number2:'2354',
                    color:'#0073b7',
                    spaColor:'#1ad1ad',
                    title1:'当前分类总记录数',
                    title2:''
                },
                {
                    name:'附件统计',
                    number1:'1234',
                    number2:'2354',
                    color:'#45a0de',
                     spaColor:'#0073b7',
                     title1:'当前上传的附件数量',
                    title2:''
                },
                {
                    name:'文章统计',
                    number1:'1234',
                    number2:'2354',
                    color:'#8986be',
                     spaColor:'#2c3e50',
                     title1:'评论次数',
                    title2:'点赞次数'
                },
                {
                    name:'新闻统计',
                    number1:'1234',
                    number2:'2354',
                    color:'#1ad1ad',
                    spaColor:'#2c3e50',
                    title1:'评论次数',
                    title2:'点赞次数'
                }
            ]
        }
    },
    methods:{
        draw(){

            // var data = []
            // function addData(){
            //     var date = new Date()
            //     let  hours = date.getHours()
            //     let minux = date.getMinutes()
            //     let secc = date.getSeconds()
            //     var time = hours + ':' + minux + ':' + secc
            //     data.push(time)
            // }
            // for(var i= 0;i< 10;i++){
            //     addData()
            // }

                var date = [];
                var data1 = [];
                var data2 = [];


                function addData(shift) {
                     var now = new Date()
                    let hours = now.getHours()
                    let minux = now.getMinutes()
                    let secc = now.getSeconds()
                    var time = hours + ':' + minux + ':' + secc
                    date.push(time);
                    data1.push(Math.ceil(Math.random()*200));
                    data2.push(Math.ceil(Math.random()*200) );

                    if (shift) {
                        date.shift();
                        data1.shift();
                        data2.shift();
                    }



                }
                for (var i = 0; i < 10; i++) {
                    addData();
                }

                let option = {
                    title: {
                        text: '商品订单'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#008489'
                            }
                        },
                        show: true,
                        transitionDuration:0,
                        confine:true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },

                    legend: {
                        data: ['成交','订单']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    },
                    yAxis: {

                        type: 'value'
                    },
                    series: [
                        {
                            name:'成交',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data: data1
                        },
                         {
                            name:'订单',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: data2
                        }
                    ]
                };
                let myEchart = this.$echarts.init(document.getElementById('container'))

                this.chnageTime =  setInterval(function () {
                    addData(true);
                    myEchart.setOption({
                        xAxis: {
                            data: date
                        },
                        series: [{
                            name:'成交',
                            data: data1
                        },
                        {
                            name:'订单',
                            data: data2
                        }]
                    });
                }, 2000);;
                if (option && typeof option === "object") {
                    myEchart.setOption(option, true);
                }

        }
    },
    mounted(){
        this.draw()
        var that = this
        window.onresize = ()=>{
          clearInterval(this.chnageTime)
          that.draw()
        }
    },
    destroyed(){
        clearInterval(this.chnageTime)
    }
}
</script>

<style>
.iconBox{
    width:70px;
    height:70px;
    font-size:30px;
    line-height: 70px;
    border-radius: 5px;
    text-align:center;
    color:#fff;
}
.ceontentS{
    line-height:35px;
    margin-left:10px;
}
.information{
    width:20%;
    padding: 15px;
    color:#fff;
    position: relative;
    border-radius: 5px;
}
.log{
    position: absolute;
    top:15px;
    right:15px;
    padding: 1px 2px;
    border-radius: 5px;
    font-size: 12px;
}
</style>
