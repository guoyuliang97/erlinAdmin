<template>
    <div class="head samebgcolor">
      <p class="fontweight">留言系统</p>
      <div>
        <p style="margin-right: 15px;">你好，{{name}}</p>
				<!-- <div class="head_icon">
					<el-dropdown trigger="click">
							<p class="head_icon" style="color: white;"><i class="el-icon-message"></i></p>
						<el-dropdown-menu slot="dropdown" style="width: 260px;margin-top: 0px;">
							<div style="width: 220px;margin: 0 auto;">
								<el-tabs v-model="activeName" @tab-click="handleClick">
									<el-tab-pane label="系统消息" name="first">
										<div v-for="item in systemArr" class="msg_detail" style="padding-bottom: 5px;border-bottom: 1px solid #dcdcdc;font-size: 12px;padding-top: 5px;cursor: pointer;">
											{{item}}
										</div>
										<div style="margin-top: 10px;">
											<el-button type="text" size="small" @click="lookSystem">查看更多</el-button>
										</div>
									</el-tab-pane>
									<el-tab-pane label="个人消息" name="second">
										<div v-for="item in personArr" class="msg_detail" style="padding-bottom: 5px;border-bottom: 1px solid #dcdcdc;font-size: 12px;padding-top: 5px;cursor: pointer;">
											{{item}}
										</div>
										<div style="margin-top: 10px;">
											<el-button type="text" size="small" @click="lookPerson">查看更多</el-button>
										</div>
									</el-tab-pane>
								</el-tabs>
							</div>
						</el-dropdown-menu>
					</el-dropdown>
				</div> -->
			
        <!-- <p class="head_icon"><i class="el-icon-setting" @click="toSetting"></i></p> -->
        <p class="head_icon" @click="loginOut"><i class="el-icon-remove-outline"></i></p>
      </div>
    </div>
</template>
<script>
    export default {
			data(){
				return{
					activeName:'first',
					systemArr:[
						"这是一条系统消息这是一条系统消息这是一条系统消息",
						"这是一条系统消息",
						"这是一条系统消息"
					],
					personArr:[
						"这是一条个人消息这是一条个人消息这是一条个人消息这是一条个人消息这是一条个人消息这是一条个人消息",
						"这是一条个人消息这是一条个人消息",
						"这是一条个人消息"
					],
					name:""
				}
			},
			methods:{
				handleClick(){
					
				},
				lookSystem(){
					this.$emit('lookSystem')
				},
				lookPerson(){
					this.$emit('lookPerson')
				},
				toSetting(){
					this.$emit('toSetting')
				},
				loginOut(){
					let token=localStorage.getItem('adminToken');
					/*this.$axios.get(this.Api+'Passport/logout',{params:{token:token}}).then(
						(res)=>{
							if(res.data.code!=1){
								this.$message({type:'warning',message:res.data.msg})
							}else{
								localStorage.setItem('token','');
								this.$router.push('/');
							}
						}
					)*/
					this.$confirm('确定退出?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
                        sessionStorage.removeItem('name')
                        this.$router.push('/login')
					}).catch(() => {
						        
					});
                },
                getUser(){
                    if(sessionStorage.getItem('name')){
                        this.name = sessionStorage.getItem('name')
                    }
                }

			},
			mounted(){
				this.getUser()
			}
    }
</script>

<style scoped>
@import url('../../static/css/head.css');
</style>
