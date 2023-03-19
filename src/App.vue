<template>
  <div>
    <p class="hello">{{title}}</p>
    <img src="./assets/image/test.png" alt="">
    <CIndex></CIndex>
  </div>
</template>

<script>
import "./assets/css/common.css";
import {ref,reactive, toRefs} from 'vue'
import CIndex from './views/index.vue'
export default {
  components:{
    CIndex
  },
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
