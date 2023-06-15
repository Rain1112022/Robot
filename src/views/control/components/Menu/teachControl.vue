<template>
  <div class="teaching-control">
    <div class="teaching-drag">
      <teach-drag></teach-drag>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRaw, onMounted, onBeforeUnmount } from "vue";
import teachDrag from './teachDrag.vue'
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
const store = useStore();

onMounted(() => {
 
})

onBeforeUnmount(() => {
 
})
</script>

<style lang="less" scoped>
.teaching-control{
  width: 100%;
  height: 100%;
  padding: 10px;
  // background: #ECF0F5;
  // background: #ffffff;
  .teaching-drag{
    width: 100%;
  height: 100%;
    }
}
</style>