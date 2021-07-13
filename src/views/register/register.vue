<template>
  <div>
    <form action="" class="login">
      <p>注册</p>
      <input type="text" id="username" placeholder="用户名">
      <input type="email" id="email" placeholder="邮箱">
      <input type="text" id="age"  placeholder="年龄">
      <label><input type="radio" name="gender" class="ti" >女</label>
      <label><input type="radio" name="gender" class="ti" checked>男</label>
      <br>
      <input type="password" id="password1" placeholder="密码">
      <input type="password" id="password2" placeholder="确认密码">
      <label><input type="checkbox" name="ten" id="yui">同意条例并确认注册</label>
      <el-button type="submit" class="btn" @click="toRegister"> 注  册 </el-button>
      <el-button type="submit" class="btn btn1" @click="toLogin"> 返  回 </el-button>
    </form>
  </div>
</template>

<script>
import {register} from "@/api/api";

export default {
  name: "register",
  methods: {
    async toRegister() {
      const userName = document.getElementById("username").value;
      const password1 = document.getElementById("password1").value;
      const password2 = document.getElementById("password2").value;
      const email = document.getElementById("email").value;
      const age = document.getElementById("age").value;

      if(userName.length === 0 || email.length === 0 || password1.length === 0 || password2.length === 0) {
        alert("填写不完整，注册失败");
      }
      else if(age - (age || 0) !==0) {
        alert("年龄必须为整数，注册失败");
      }
      else if (password1 !== password2) {
        alert("密码不相同，注册失败");
      }
      else if(password1.length<6) {
        alert("密码不足6位，注册失败");
      }
      else {
        let userInfo = {
          "username": userName,
          "password": password1,
          "email"   : email,
          "age"     : age
        };
        console.log("开始注册")
        let judge = await register(userInfo);
        console.log(judge)
        if (judge.result === "yes") {
          console.log("注册成功")
          alert("注册成功，即将跳转到登陆界面");
          await this.$router.push('/login');
        }
        else {
          console.log("注册失败")
          alert("注册失败");
        }

      }
    },

    toLogin() {
      this.$router.push('/login');
    },
  }
}
</script>

<style scoped>
*{
  user-select: none;
  /* 无法选中，整体感更强 */
}
#yui{
  margin-left: -470px;
  width: min-content;
  height: min-content;
}
.ti{
  margin-left: -160px;
  margin-top: 8px;
  width: max-content;
  height: max-content;
}
.login{
  position: absolute;
  top: 50%;
  margin-top: -281px;
  left: 50%;
  margin-left: -200px;
  /* absolute居中的一种方法 */
  background-color: whitesmoke;
  width: 400px;
  height: 557px;
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
  height: 40px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid silver;
  /* 下面的会覆盖上面的步伐 */
  outline: none;
  font-size: 22px;
}

.btn{
  display: block;
  background-color:#3399CC ;
  width: 42%;
  height: 52px;
  border-radius: 23px;
  margin-top: 37px;
  font-size: 31px;
  font-weight: 600;
  color: white;
  float:left;
}
.btn1
{
  margin-left: 40px;
}
.btn:hover{
  background-color:#17D3AD
}
</style>
