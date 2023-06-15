<script setup>
import { computed, useAttrs,  useSlots, } from 'vue'
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
  labelWidth:{
    type:String,
    require:false,
    default:'100px'
  },
  itemWidth:{
    type:String,
    require:false,
    default:'460px'
  },
  ruleForm:{
    type: Object,
    require: true,
    default:{}
  },
  rules:{
    type: Object,
    require: true,
    default:{}
  },
  
})

const formStyle = reactive({
  'max-width': props.itemWidth
})

const ruleFormRef = ref()


</script>

<template>
  <el-form
    ref="ruleFormRef"
    :label-width = props.labelWidth
    :model="props.ruleForm"
    :style="formStyle "
    :rules="props.rules"
  >
    <el-form-item label="Name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-input v-model="ruleForm.region" />
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="ruleForm.type" />
    </el-form-item>
  </el-form>
</template>

<style lang="less">

</style>
