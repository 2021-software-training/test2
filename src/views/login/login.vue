<template>
  <div>
    <form action="" class="login">
      <p>Login</p>
      <input type="text" placeholder="用户名">
      <input type="password" placeholder="密码">

      <input type="submit" class="btn" value=" 登  录 " @click="getMsg">
      <input type="submit" class="btn" value=" 注  册 " @click="func2">
    </form>
  </div>
</template>

<script>
import {request} from "@/api/api";

export default {
  name: "login",

  methods: {
    getMsg() {
      request({
        method: 'post',
        url:  ''
      })
    },

    func1() {
      alert("登陆失败");
    },

    func2() {
      alert("注册失败")
    },

  }
}
</script>

<style scoped>
*{
  user-select: none;
  /* 无法选中，整体感更强 */
}

body{
  background-size: cover;
  background: url(wallpaper.jpg) no-repeat fixed;
}

.login{
  position: absolute;
  top: 50%;
  margin-top: -200px;
  left: 50%;
  margin-left: -200px;
  /* absolute居中的一种方法 */
  background-color: whitesmoke;
  width: 400px;
  height: 400px;
  border-radius: 25px;
  text-align: center;
  padding: 5px 40px;
  box-sizing: border-box;
  /* 这样padding就不会影响大小 */
}

p{
  font-size: 42px;
  font-weight: 600;
}

input{
  background-color: whitesmoke;
  width: 100%;
  height: 48px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid silver;
  /* 下面的会覆盖上面的步伐 */
  outline: none;
  font-size: 22px;
}

.btn{
  background-color: #59c2c5;
  width: 38%;
  height: 48px;
  border-radius: 8px;
  margin-top: 40px;
  font-size: 28px;
  font-weight: 600;
  color: white;
}
.btn:hover{
  background-color: #59c2a0;
}
</style>