<template>
  <div style="text-align:center;margin-top:30px">
    <span class="title">{{ title }}</span>
    <button @click="login">login</button>
  </div>
</template>

<script>
import { ref, reactive,getCurrentInstance, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  setup(props) {
    const data = reactive({
      title: "點擊登錄:",
    });
    const { proxy, ctx } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    store.commit("setLoginStatus", false);
    const login = async () => {
      try {
        const res = await proxy.$http.login({
          username: 'ABRS001',
          password: 'e10adc3949ba59abbe56e057f20f883e',
        });
        console.log(res)
      } catch (error) {
        console.log(error);
      }
    };
    return {
      ...toRefs(data),
      login,
    };
  },
};
</script>
<style lang="less" scoped>
.title {
  color: rgb(20, 136, 252);
  font-size: 20px;
  margin-right:20px;
}
.title2 {
  color: rgb(20, 136, 252);
  font-size: 20px;
  margin-right:20px;
}
</style>
