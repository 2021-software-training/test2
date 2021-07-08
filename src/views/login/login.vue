<template>
  <div>
    <form action="" class="login">
      <p>Login</p>
      <input  v-model="userName" placeholder="用户名">
      <input  v-model="userPassword" placeholder="密码">
<!--      <input type="submit" class="btn" value=" 登  录 " @click="getMsg">-->
<!--      <input type="submit" class="btn" value=" 注  册 " @click="getMsg2">-->
      <a-button  @click="toLogin" class="btn">登 陆</a-button>

      <a-button  @click="getMsg" class="btn">注 册</a-button>
    </form>
  </div>
</template>

<script>
// import {requestPost, requestGet} from "@/api/api";
import axios from "axios";
import {login} from "@/api/api";

export default {
  name: "login",
  data() {
    return {
      msg: 'null',
      userName: '',
      userPassword: ''
    }
  },

  methods: {
    async toLogin() {
      let data = {"username": this.userName, "password": this.userPassword};
      let judge = await login(data);
      console.log(judge);
      console.log((judge.token))

      if (judge.result === "yes") {
        window.sessionStorage.setItem("token", judge.token);
        console.log("success!");
      } else {
        console.log("failed");
      }
    },
    getMsg() {
      axios.get('http://127.0.0.1:8000/api/')
          .then((response) => {
            console.log(response.data);
            console.log(this.userName);
            console.log(this.userPassword)
          })
          .catch((error) => {
            console.log('出错了！', error);
          })
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
  width: 48%;
  height: 48px;
  border-radius: 4px;
  margin-top: 40px;
  margin-right: 20px;
  margin-left: 20px;
  font-size: 50px;
  font-weight: 600;
  color: white;
}
.btn:hover{
  background-color: #59c2a0;
  width: auto;
}
</style>