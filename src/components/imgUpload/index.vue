<template>
    <div class="app-container">
       
        <el-upload
            action="http://up-z2.qiniu.com/"
            list-type="picture-card"
            :file-list="fileArr"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            :on-error="handleError"
            :limit="limit"
            :on-exceed="handleExceed"
            :data="uploadData"
            
            >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        
    </div>
</template>

<script>
import { getQiniuToken } from '@/api/util'

export default {
    name: 'imgUpload',
    props: ['fileList'],
    data() {
        return {
            limit: 5,
            imgs: {},
            uploadData: {
                token: null
            },
            dialogImageUrl: '',
            dialogVisible: false,

            fileArr: []
        }
    },
 
    computed: {
        device() {
            return this.$store.state.app.device
        }
    },
    created() {
        this.init()
    },
    methods: {

        init(){

            this.fileArr = this.fileList;

            this.getQiniuToken();
        },

        getQiniuToken(){

            getQiniuToken().then(res => {
                if (res.code !== 0){
                    return;
                }
                this.uploadData.token = res.result.token;
            });
        },

        handleSuccess(res, file, fileList) {   //上传成功后在图片框显示图片
            // console.log(res, file, fileList)

            this.fileArr.push({
                name: res.key,
                url: 'http://opgijh4ay.bkt.clouddn.com/'+ res.key
            })

            this.$emit("input", this.fileArr)

        },
        handleError(res) {   //显示错误
            console.warn(res)
        },
        beforeUpload(file) {    //在图片提交前进行验证
            let flag = true;

            const isJPG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG&&!isPNG) {
                flag = false;
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
                flag = false;
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }

            return flag
        },

        handleRemove(file, fileList) {
            // console.log(file, fileList);

            this.fileArr.splice(this.fileArr.findIndex(item => item.name===file.name), 1)

            this.$emit("input", this.fileArr)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleExceed(files, fileList){
            console.warn(files, fileList);
        }
    }
}
</script>
