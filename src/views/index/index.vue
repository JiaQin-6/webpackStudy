<template>
  <div>
    <p class="hello">{{ title }}</p>
    <img style="width: 200px" src="../../assets/image/test.png" alt="" />
    <button @click="toHome">to home</button>
  </div>
</template>

<script>
import { ref, reactive,getCurrentInstance, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  setup(props) {
    const data = reactive({
      title: "这是主页面",
    });
    const { proxy, ctx } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
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
    const toHome = ()=>{
      router.push({
        path:'/home'
      })
    };
    return {
      ...toRefs(data),
      login,
      toHome
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
