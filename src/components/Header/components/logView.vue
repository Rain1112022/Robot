<template>
  <div class="log-view">

    <p class="scrollbar-demo-item">关节空间:{{ JointInfo }}</p>
    <p class="scrollbar-demo-item">Tcp空间:{{ CartInfo }}</p>
    <!-- <h4>关节空间:{{ JointInfo }}</h4> -->
    <!-- <h4>Tcp空间:{{ CartInfo }}</h4> -->

    <p class="scrollbar-demo-item">当前运行----{{ curSend}}</p>
    
    <!-- <el-table :data="teachTable" max-height="400px" style="width:100%;">
      <el-table-column  prop="name" label="点位" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="val" label="位置信息"/>
    </el-table> -->

    <el-scrollbar height="400px">
      <p v-for="item in teachTable" :key="item" class="scrollbar-demo-item">{{ item.name }} ----{{ item.val }}</p>
    </el-scrollbar>
    
  </div>
</template>

<script setup>
import { reactive, onMounted, toRaw, computed, ref, } from "vue";
import { useStore } from 'vuex';
const store = useStore();
const emit = defineEmits(["closeDialog"]);
const props = defineProps({
})
const teachTable =computed(()=> {
  return store.state.teaching.teachPoint.length?store.state.teaching.teachPoint : []  //{name:'',value:''}
}) 

const JointInfo = computed(()=> {
  return store.state.stateInfo.JointInfo
}) 
const CartInfo = computed(()=> {
  return store.state.stateInfo.CartInfo
}) 

const curSend = computed(() => {
  let current = store.state.codeOperate.curSend
  let key =  current.space =="jointSpace"? "关节运动":current.space =="tcpSpace"?"TCP运动":""
  let value = current.point
  return key + ":"+ "[" + value+ "]"
})

</script>


<style lang="less" scoped>
.log-view{
  width: 100%;
  max-height: 600px;
  overflow-y: scroll;
  // background-color: aquamarine;
  
.scrollbar-demo-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: start;
  height: 50px;
  margin: 10px 0;
  padding: 0 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

}
</style>