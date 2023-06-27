<template>
  <div>
    <p class="hello">{{ title }}</p>
    <img style="width: 200px" src="../../assets/image/test.png" alt="" />
  </div>
</template>

<script>
import { ref, reactive,getCurrentInstance, toRefs } from "vue";
import { useStore } from "vuex";
import "../../assets/css/common.css";
export default {
  setup(props) {
    const data = reactive({
      title: "这是主页面",
    });
    const { proxy, ctx } = getCurrentInstance();
    const store = useStore();
    store.commit("setLoginStatus", false);
    const login = async () => {
      try {
        const res = await proxy.$http.login({
          loginName: 'david',
          password: 'david',
        });
        console.log(res)
      } catch (error) {
        console.log(error);
      }
    };
    login();
    return {
      ...toRefs(data),
      login,
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
