<template>
  <div>
    <el-button @click="func1">点击发送post信息</el-button>
  </div>
</template>

<script>
import {sendTest} from "@/api/api";

export default {
  name: "testVue",
  methods: {
    async func1() {
      let Info = {
        Info1: "Test",
        Info2: "lx123456789"
      };
      let temp = await sendTest(Info);
      console.log("开始");
      console.log(temp);
    }
  }
}
</script>

<style scoped>

</style>