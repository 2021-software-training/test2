<template>
 <div>
   <template>
     <el-upload
         class="upload-demo"
         drag
         :action="uploadUrl"
         :headers="myHeader2"
         :on-success="handleAvatarSuccess"
         :before-upload="beforeAvatarUpload"
         multiple>
       <i class="el-icon-upload"></i>
       <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
       <template #tip>
         <div class="el-upload__tip">
           只能上传 jpg/png 文件，且不超过 6MB
         </div>
       </template>
     </el-upload>
   </template>
 </div>
</template>

<script>
export default {
  name: "faceCheck",
  data() {
    return {
      page: window.sessionStorage.getItem("username"),
      uploadUrl: 'http://127.0.0.1:8000/mainPage/changeHead',
      myHeader: {
        Authorization: window.sessionStorage.getItem('token')
      },
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 6;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 6MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>

</style>