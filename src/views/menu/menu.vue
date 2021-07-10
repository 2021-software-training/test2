<template>
  <div id="menu">
    <ul>
      <li><a href="/">主页</a></li>
      <li><a href="/">所有文章</a></li>
      <li class="level1">
        <a>我的</a>
        <ul class="level2">
          <li>
            <a>我的文章</a>
          </li>
          <li>
            <a>我的评论</a>
          </li>
        </ul>
      </li>
      <li class="level1">
        <a>设置</a>
        <ul class="level2">
          <li>
            <a>语音设置</a>
          </li>
          <li>
            <a>个人设置</a>
          </li>
        </ul>
      </li>
      <li><a href="/edit">新的文章</a></li>
    </ul>
    <br>
  </div>
</template>

<script>
export default {
  name: "menu"
}
</script>

<style scoped>
#picture{
  margin-top: -21px;
}
#menu {
  background:url("./wallpaper.jpg");
  padding-top:0;
  padding-left:0;
  padding-right:0;
  /*background-color:#0DC4BD;*/
  height:100%;
  width:100%;
  position:absolute;
  left:0;
  top:0;
}
#menu ul {
  list-style: none;
  padding-left:0;
  margin:0;
  height:100%;
}
#menu ul li {
  float: left;
  padding: 15px 50px;
  display: block;
  background-color: #10AEA9;
}
#menu ul li a{
  display: block;
}

#menu ul li:hover {
  background-color: #909399;
}
#menu ul li.level1:hover {
  padding-left: 0;
  padding-right: 0;
}
#menu ul li.level1:hover>a{
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom:14.5px;
}

#menu ul li.level1:hover .level2 {
  display: block;
}

#menu ul li.level1 ul.level2 {
  display: none;
  background-color:gray;
}
#menu ul li.level1 ul.level2 li:hover {
  background-color: #909399;
}

#menu ul li.level1 .level2 li {
  display:block;
  float:none;
  background-color:gray;
}
#menu ul li a {
  text-decoration: none;
  color: white;
}

</style>