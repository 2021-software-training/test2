<template>
  <body>

  <!--  <nav id="sort">-->
  <!--    <ul>-->
  <!--      <li><el-link href="/allArtcle"><img src="assets/images/icon-1.png" alt=""> <em>我的搜索</em></el-link></li>-->
  <!--      <li><el-link href="/history"><img src="assets/images/icon-2.png" alt=""> <em>历史</em></el-link></li>-->
  <!--      <li><el-link href="/science"><img src="assets/images/icon-3.png" alt=""> <em>科技</em></el-link></li>-->
  <!--      <li><el-link href="/life"><img src="assets/images/icon-4.png" alt=""> <em>生活</em></el-link></li>-->
  <!--    </ul>-->
  <!--  </nav>-->

  <div class="header-wrapper">
    <div class="user-avatar">
      <el-avatar id="image1" shape="square"> user </el-avatar>
    </div>

    <header>
      <div class="container">
        <div class="logo-container">
          <!-- Website Logo -->
          <p id="bigname"><strong>L  I  F  T  E  R</strong></p>
        </div>

        <!-- Start of Main Navigation -->
        <nav class="main-nav">
          <div class="menu-top-menu-container">
            <div class="search">
              <input class="search-term" type="text"  placeholder="search" />
              <input class="search-btn" type="submit" value="search" />
            </div>
            <ul id="menu-top-menu" class="clearfix">
              <li class="current-menu-item"><el-link href="/menu">网站主页</el-link></li>
              <li><el-link href="/allArticle">所有文章</el-link></li>
              <li><el-link href="/myArticle">我的</el-link></li>
              <!--              <li><el-link href="/myComment">我的评论</el-link></li>-->
              <li><el-link @click="toUserPage">个人主页</el-link></li>
            </ul>
          </div>
        </nav>
        <!-- End of Main Navigation -->

      </div>
    </header>
  </div>

  <div class="row separator">
    <!--    <h3>我的搜索</h3>-->
    <el-dropdown id="block1">
      <el-button type="primary">
        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click="toMyArticle">我的文章</el-dropdown-item>
        <el-dropdown-item @click="toMyLike">我的点赞</el-dropdown-item>
        <el-dropdown-item @click="toMyComment">我的评论</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <br><br><br>

    <el-divider></el-divider>
    <el-space wrap alignment="flex-end">
      <el-card class="box-card" style="width: 1000px" v-for="(comment, index) in comments" v-bind:key="index">
        <template #header>
          <div class="card-header">
            <span>{{comment.article.articleTitle}}</span>
          </div>
        </template>
        <div class="text-item">
          <div class="article-text">
            {{comment.comment.commentText}}<br>
          </div>
          <br>
          <div class="article-icon">
            <el-button icon="el-icon-chat-line-round" size="small" type="comment" @click="toDetailArticle(index)">
              评论 {{comment.comment.commentsNum}}
            </el-button>
            <el-button icon="el-icon-caret-top" size="small" type="like" @click="sendLike(index)">
              赞同 {{comment.comment.commentLikesNum}}
            </el-button>
          </div>
          <br><br><br><br>
          <div>
            <template class="but2">
              <el-popconfirm title="确定删除这篇文章吗？" icon="el-icon-close" size="small" @confirm="toDelete(index)" type="comment">
                <template #reference>
                  <el-button icon="el-icon-close" size="small" type="comment"  class="delete">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </div>

        </div>
      </el-card>
    </el-space>
  </div>
  </body>
</template>

<script>
import {addLikeArticle, deleteComment, showUserAllComment} from "@/api/api";
export default {
  name: "allArticle",
  data() {
    return {
      page: window.sessionStorage.getItem("username"),
      articlesData: [{
        articleID:    '',
        articleType1: '',
        articleType2: '',
        articleType3: '',
        title:        '',
        time:         '',
        articleText:  '',
        commentsNum:  '',
        likesNum:     ''
      }],

      comments: [
        {
         comment: {},
         article: {}
        }
      ]
    }
  },
  created() {
    showUserAllComment().then((myData) => {
      if (myData.result === 0) {
        this.$router.push('/login');
        alert("请先登陆");
      }
      this.comments = myData;
      console.log(this.comments)
    })
  },

  methods: {
    toUserPage() {
      this.$router.push("/personalPage/" + this.page);
    },

    async toDelete(num) {
      console.log("begin;")
      console.log(this.comments[num])
      const comment = {
        commentID: this.comments[num].comment.commentID
      }
      console.log("操作了");
      let judge = await deleteComment(comment);
      if (judge.result === "yes") {
        alert("操作成功！");
      } else {
        alert("操作失败")
      }
      location.reload();
    },
    sendLike(num) {
      let articleInfo = {
        articleID: this.comments[num].article.articleID
      };
      addLikeArticle(articleInfo);
      location.reload();          //到时候需要换一下
    },

    async toDetailArticle(num) {
      await this.$router.push('/detailArticle/' + (this.comments[num].article.articleID).toString())
    },

    toMyArticle() {
      this.$router.push('/myArticle');
    },

    toMyLike() {
      this.$router.push('/myLike')
    },
    toMyComment() {
      this.$router.push('/myComment');
    }
  }
}
</script>

<style scoped>


.but2 {
  float: right;
}

#block1  {
  float:right;
  vertical-align: top;
}

.el-button--comment.is-active,
.el-button--comment:active {
  background: #20B2AA;
  border-color: #20B2AA;
  color: #fff;
}


/*点击之后的颜色*/
.el-button--comment:focus,
.el-button--comment:hover {
  background: #1E90FF;
  border-color: #1E90FF;
  color: #fff;
}

/*未被点击的颜色*/
.el-button--comment {
  color: #FFF;
  background-color: #1E90FF;
  border-color: #1E90FF;
}



.el-button--like.is-active,
.el-button--like:active {
  background: #20B2AA;
  border-color: #20B2AA;
  color: #fff;
}


/*点击之后的颜色*/
.el-button--like:focus,
.el-button--like:hover {
  background: #000080;
  border-color: #000080;
  color: #fff;
}

/*未被点击的颜色*/
.el-button--like {
  color: #FFF;
  background-color: #1E90FF;
  border-color: #1E90FF;
}


.search{

}

.card-header {
  font-size:18px;
  font-family: "Microsoft YaHei", Arial,sans-serif;
  font-weight: bold;
}

.article-text {
  float: left;
  font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
}

.article-icon {
  float: right;
  font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  color: #3A5F7B;
}

.user-avatar {
  float: right;
  margin-top: 30px;
  margin-right: 10px;
}

/*#image1{*/
/*  border-radius: 50%;*/
/*  float:left;*/
/*  margin-left:40px;*/
/*  margin-top:15px !important;*/
/*}*/
#sort {
  top: 147px;
  text-align: center;
  background: #3b4348;
  position: absolute;
  z-index: 100;
  height: 90%;
  left: 16px;
  width: 150px;

}
#sort em {
  font-style: normal;
  font-size: 13px;
  text-transform: uppercase;
  display: block;
  margin-top: 15px;
  color: #fff;
}

#sort ul li a {
  text-align: center;
}

#sort ul {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  list-style-type: none;
  height: 70%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}
#sort ul li {
  text-align: center;
  margin: 5px 0px;
}
#sort a, #sort a:visited, #sort a:active {
  color: #fff;
}
#sort a {
  text-decoration: none!important;
  display: inline-block;
  width: 140px;
  padding: 15px 0px;
  position: relative;
  z-index: 0;
  transition: all .5s;
}
#sort a.active {
  background-color: rgba(0,0,0,0.8);
}
#sort a::before {
  content: "";
  position: absolute;
  height: 0%;
  width: 0%;
  bottom: 0;
  left: 0;
  opacity: 1;
  z-index: -1;
}
.logo {
  margin-top: 150px;
  top: -1px;
  left: 16px;
  z-index: 999999;
  position: fixed;
  display: inline-block;
  text-align: center;
  background-color: black;
  height: 15%;
  width: 15%;
}
.logo h1 {
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 900;
  color: #3b4348;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
.logo h2 {
  display: none;
}
body {
  background-color: #EBEEF5;
}
.article-entry .like-count[data-v-a70e9a84] {
  position: absolute;
  bottom: 0px;
  right: 0px;
  line-height: 18px;
  font-weight: 600;
  padding: 3px 5px 3px 20px;
  border: 1px solid #f2f2f2;
  border-bottom: none;
  background: url("#") no-repeat 6px 8px;
}
.header-wrapper {
  background-color: #3A5F7B;
  width: 100%;
  height: auto;
  margin-top:-61px;
}
.header-wrapper .container {
  position: relative;
  min-height: 60px;
  height: auto !important;
  height: 150px !important;
  top:5px;
}
#bigname{
  color:white;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC",serif;
  font-size: 45px;
  margin-left: -800px;
  margin-top: 35px;
  margin-bottom: -100px;
}
.logo-container {
  padding: 19px 0;

}
.logo-container img {
  margin-right: 10px;
}

span.tag-line {
  color: #818a90;
  font-size: 12px;
  position: relative;
  padding-top: 2px !important;
  left:-520px;
}
.main-nav {
  position: absolute;
  top: 5px;
  left:710px;
  right: 0;
}
.main-nav div > ul {
  width: auto;
  margin: 0;
}
.main-nav div > ul > li {
  position: relative;
  float: left;
  list-style: none;
  padding: 45px 14px 18px;
}
.main-nav div > ul > li a {
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  color: #c1cad1;
}
.main-nav div > ul > li a:hover {
  color: #fff;
}
.main-nav div > ul > li:hover > a {
  color: #fff;
}
.main-nav div > ul > li:last-child {
  padding-right: 0;
}
.main-nav div > ul li.current-menu-item a {
  color: #fff;
}
.main-nav .sub-menu {
  position: absolute;
  top: 56px;
  left: 0px;
  list-style: none;
  margin: 0;
  display: none;
}
.main-nav .sub-menu li {
  position: relative;
  background-color: #3b4348;
  padding: 6px 10px;
  width: 150px;
  cursor: pointer;
}
.main-nav .sub-menu li:hover {
  background-color: #292e32;
}
.main-nav .sub-menu li:hover > a {
  color: #fff;
}
.main-nav .sub-menu .sub-menu {
  top: 0px;
  right: 170px;
  left: auto;
}
.main-nav .responsive-nav {
  display: none;
}

/* Header - Search ---------------------------------------------------------------------------------------------------*/
.search-area-wrapper {
  background: #353b65 url("../../assets/wallpaper.jpg") center top no-repeat;
  background-size: 100%;
  min-height: 279px;
  height: auto !important;
  height: 279px;
}
.search-area-wrapper .search-area {
  padding: 50px 0;
}

h3.search-header {
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 36px;
  color: #fff;
  text-align: center;
}

p.search-tag-line {
  font-family: "Droid Serif", serif;
  font-style: italic;
  font-size: 18px;
  line-height: 28px;
  color: #fff;
  text-align: center;
}

form.search-form {
  margin: 40px 0 0;
  text-align: center;
}
form.search-form , form.search-form input.search-term, form.search-form input.search-btn {
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  box-shadow: none;
  border-radius: 0;
  display: inline-block;
  border: none;
  vertical-align: bottom;
}
form.search-form input.search-term {
  font-size: 14px;
  height: 24px;
  line-height: 24px;
  padding: 12px;
  width: 72%;
  color: #858c91;
  margin-right: 10px;
  margin-bottom: 0;
}
form.search-form input.search-term.loading {
  background-image: url("../../assets/wallpaper.jpg");
  background-repeat: no-repeat;
  background-position: 98% 50%;
}
form.search-form input.search-btn {
  background-color: #3f4b55;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  padding: 14px 30px 15px;
  color: #fff;
}
form.search-form input.search-btn:hover {
  background-color: #4b5760;
}

#search-error-container label {
  color: #fff;
  padding: 5px;
  font-size: 14px;
}

.lt-ie8 form.search-form input.search-btn {
  padding-top: 12px;
  padding-bottom: 13px;
}

/* Page - Container --------------------------------------------------------------------------------------------------*/
.page-container {
  width: 100%;
}
.page-container > .container {
  padding: 40px 35px;
  background-color: #fff;
}


.pages-nav a {
  margin-right: 10px;
}


div {
  display: block;
  margin: 5px auto 20px auto;
}

li.comment > article {
  background: #fff;
  float: left;
  margin: 0px 10px 10px 0;
  position: relative;
  z-index: 1;
  -webkit-border-radius: 60px;
  -moz-border-radius: 60px;
  border-radius: 60px;
}
.page-content {
  margin-bottom: 20px;
}

.row.separator {
  margin-bottom: 10px;
}
.articles-list {
  margin-bottom: 20px;
}
.articles-list > h3 {
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 20px;
}
.articles-list > h3 span {
  color: #6f7579;
  font-size: 16px;
}
.articles-list > h3 a {
  color: #3b4348;
}
.articles-list > h3 a:hover {
  color: #395996;
}

ul.articles {
  list-style: none;
  margin: 0;
}
ul.articles .article-entry {
  position: relative;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 0 0 24px;
  background: url("../../assets/wallpaper.jpg") no-repeat 0 3px;
}
ul.articles .article-entry.standard {
  background: url("../../assets/wallpaper.jpg") no-repeat 0 3px;
}
ul.articles .article-entry.video {
  background: url("../../assets/wallpaper.jpg") no-repeat 0 3px;
}
ul.articles .article-entry.image {
  background: url("../../assets/wallpaper.jpg") no-repeat 0 3px;
}
ul.articles .article-entry {
  background: url("../../assets/wallpaper.jpg") no-repeat 0 3px;
}
ul.articles li.article-entry:last-child {
  border-bottom: 1px solid #f2f2f2;
}

.article-entry > h4 {
  font-size: 13px;
  margin-bottom: 5px;
  font-weight: 600;
}
.article-entry > h4 a {
  color: #3b4348;
}
.article-entry > h4 a:hover {
  color: #395996;
}
.article-entry .article-meta {
  display: block;
  margin-bottom: 10px;
}
.article-entry .like-count {
  position: absolute;
  bottom: 0px;
  right: 0px;
  line-height: 18px;
  font-weight: 600;
  padding: 3px 5px 3px 20px;
  border: 1px solid #f2f2f2;
  border-bottom: none;
  background: url("../../assets/liked.png") no-repeat 6px 8px;
}
.article-entry:hover .like-count {
  background: url("../../assets/wallpaper.jpg") no-repeat 6px -22px;
  color: #395996;
}

#footer .article-entry .like-count {
  border-color: #535b61;
}
#footer .article-entry:hover .like-count {
  color: #fff;
}
#footer ul.articles li.article-entry:last-child {
  border-bottom: 1px solid #535b61;
}

.main-listing article {
  margin-bottom: 0;
}
.page-container > .container {
  padding: 40px 20px;
}
@media (max-width: 767px) {
  /* Navigation */
  .main-nav > div {
    display: none;
  }

  .main-nav {
    display: block;
    width: 85%;
    margin: 10px auto;
    padding: 10px;
    border-radius: 0;
    border: none;
  }

  /* Search Area */
  .search-area-wrapper {
    background-size: auto;
    min-height: 240px;
    height: auto !important;
    height: 240px;
  }

  .search-area-wrapper .search-area {
    padding: 20px 0;
  }

  .search-area-wrapper h3.search-header {
    font-size: 30px;
    padding: 0 15px;
  }

  .search-area-wrapper p.search-tag-line {
    padding: 0 15px;
    font-size: 14px;
    line-height: 22px;
  }

  .search-area-wrapper form.search-form input.search-term {
    width: 60%;
  }

  @media (max-width: 480px) {
    /* Search Area */
    .search-area-wrapper form.search-form input.search-term {
      width: 80%;
      display: block;
      margin: 0 auto 10px;
    }

    .search-area-wrapper form.search-form input.search-btn {
      display: block;
      margin: 0 auto;
    }

    ul.articles .article-entry {
      padding-bottom: 20px;
    }
  }
  /* Menu Fix for resizing to Bigger Screen sizes */
  @media (min-width: 980px) {
    .main-nav div > ul > li {
      float: none;
      display: inline-block;
    }
  }
}
</style>