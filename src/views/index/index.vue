<template>
  <div>
    <p class="hello">{{ title }}</p>
    <img style="width: 200px" src="../../assets/image/test.png" alt="" />
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import "../../assets/css/common.css";
export default {
  setup(props) {
    const data = reactive({
      title: "这是主页面",
    });
    console.log(0);
    return {
      ...toRefs(data),
    };
  },
};
</script>
<style lang="less" scoped>
.hello {
  color: red;
  display: flex;
  font-size: 32px;
}
</style>
