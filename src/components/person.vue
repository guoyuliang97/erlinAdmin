<template>
    <div class="sameContent">
        <p style="text-align:right">常规管理/个人配置</p>
        <div class="flexStart sameMargin">
            <div class="ower">
                <p>个人配置</p>
                <div class="sameMargin textCenter"> 
                    <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="sameMargin">
                        <p class="contentTitle">admin</p>
                        <p style="color: #999999;margin: 15px 0;">admin@admin.com</p>
                    </div>
                    <div style="text-align:left">
                        <el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户名" >
                                <el-input type="text" disabled="" v-model="ruleForm.count" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="email" prop="email">
                                <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="昵称" prop="name">
                                <el-input type="text" v-model.number="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model.number="ruleForm.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="user_log">
                <el-tabs v-model="editableTabsValue" type="card" >
                    <el-tab-pane
                        v-for="(item, index) in editableTabs"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name"
                    >
                        <el-table
                            :data="item.tableData"
                            style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="ID"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="标题"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="链接">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="ip">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="操作时间">
                            </el-table-column>
                        </el-table>
                        <div class="sameMargin" style="text-align:right">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[100, 200, 300, 400]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="400">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
          var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                    callback(new Error('必须年满18岁'));
                    } else {
                    callback();
                    }
                }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
        return {
            imageUrl:'',
            labelPosition:'top',
            ruleForm: {
                count: 'admin',
                email: '',
                name: '',
                password:''
            },
            rules: {
                email: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                name: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                password: [
                    { validator: checkAge, trigger: 'blur' }
                ]
            },
            tableData:[{}],
            editableTabsValue:'1',
            editableTabs: [{
                title: '操作日志',
                name: '1',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
                },
            ],
            currentPage:1
            
        }
    },
    methods:{
         handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        submitForm(formName) {

        },
        resetForm(formName) {
            console.log(formName)
            this.$refs[formName].resetFields();
        },
        handleCurrentChange(){

        },
        handleSizeChange(){

        }
    },
    mounted(){

    }
}
</script>

<style>
.ower{
    width:30%;
    border-radius:5px;
    border: 1px solid #eee;
    border-top: 2px solid #008489;
    box-shadow: 0 0 3px 0px #666;
    padding: 1% 2%;
}
.user_log{
  width:65%;
  margin-left:5%;
}
.avatar-uploader{
    display: flex;
    justify-content: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
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
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
  }
  .avatar {
    width: 108px;
    height: 108px;
    display: block;
  }
</style>