<template>
  <div>
    <el-row>
      <el-form>
        <el-form-item label="文章标题">
          <el-col :span="6">
            <el-input v-model="model.title"></el-input>
          </el-col>
        </el-form-item>
        <div style="margin-bottom: 20px">
          <el-checkbox v-model="checked1" label="Game" border size="medium"></el-checkbox>
          <el-checkbox v-model="checked2" label="History" border size="medium"></el-checkbox>
          <el-checkbox v-model="checked3" label="Science" border size="medium"></el-checkbox>
        </div>
        <el-form-item>
          <el-col>
            <mavon-editor v-model="model.content" default-open="edit"></mavon-editor>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col>
            <el-button type="primary" size="small" @click="submit" icon="el-icon-upload2">发表</el-button>
          </el-col>
          <el-popconfirm title="确定返回到上一届界面吗？你所写的记录不会被保存" icon="el-icon-close" size="small" @confirm="back" type="comment">
            <template #reference>
              <el-button icon="el-icon-close" size="small" type="comment"  class="delete">
                返回
              </el-button>
            </template>
          </el-popconfirm>

        </el-form-item>

      </el-form>
    </el-row>
  </div>
</template>

<script>
import {addArticle} from "@/api/api";

export default {
  name: "writeArticle",
  data() {
    return {
      model: {
        title: '',
        content: '',
      },
      checked1: false,
      checked2: false,
      checked3: false,
      articleInfo: {
        articleTitle:  '',
        articleType1: '',
        articleType2: '',
        articleType3: ''
      }
    }
  },

  methods: {
    back() {
      this.$router.push('/myArticle')
    },
    async submit() {
      console.log(this.model.title)
      console.log(this.model.content)
      this.articleInfo.articleTitle = this.model.title;
      this.articleInfo.articleText = this.model.content;

      if (this.checked1) {
        this.articleInfo.articleType1 = "Game";
      }

      if (this.checked2) {
        this.articleInfo.articleType2 = "History";
      }

      if (this.checked3) {
        this.articleInfo.articleType3 = "Science";
      }

      const res = await addArticle(this.articleInfo);
      if (res.result === "yes") {
        alert("发表成功")
        this.$router.push('allArticle/All')
      }

      else {
        alert("失败");
      }
    }
  }
}
</script>

<style scoped>

</style>