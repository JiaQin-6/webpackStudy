<template>
  <div>
    <p class="hello">{{title}}</p>
    <img src="./assets/image/test.png" alt="">
  </div>
</template>

<script>
import "./assets/css/common.css";
import {ref,reactive, toRefs} from 'vue'
export default {
    setup(props) {
        const data = reactive({
          title:'你好'
        });
        return {
            ...toRefs(data)
        }
    }
};
</script>

<style lang="less" scoped>
.hello {
  color: red;
  display: flex;
  font-size: 32px;
}
</style>
