<script setup>
import { computed, useAttrs, ref, unref, useSlots, watch, nextTick } from 'vue'
import { isNumber } from '@/utils/util'

const slots = useSlots()

const props = defineProps({
  modelValue: Boolean,
  title:{ 
    type:String,
    require:false,
    default:'Tips'
  },
  fullscreen: Boolean,
  width:{
    type:String,
    require:false,
    default:'40%'
  }
})
const emit = defineEmits(["closeDialog"]);
const getBindValue = computed(() => {
  const delArr = ['fullscreen', 'title', 'maxHeight']
  const attrs = useAttrs()
  const obj = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
})
const closeDialog = () =>{
  emit("closeDialog", 'dialog')
}

</script>

<template>
  <el-dialog
    v-bind="getBindValue"
    destroy-on-close
    draggable
    :close-on-click-modal="false"
    :width="props.width"
    :show-close="false"
  >
  <template #title>
      <div class="my-header">
        <h4 >{{ props.title }}</h4>
        <el-button type="danger" @click="closeDialog">
          Close
        </el-button>
      </div>
    </template>
  <slot ></slot>
    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.el-dialog .el-dialog__header {
  margin-right: 0 !important;
  border-bottom: 1px solid #333;
}
.my-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.el-dialog .el-dialog__footer {
  border-top: 1px solid  #333;
}

.el-dialog .is-hover {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}


</style>
