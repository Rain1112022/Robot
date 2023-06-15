<template>
  <div class="teaching-joint">
    <p style="height: 50px;line-height:50px;" class="check-text">请选择可拖动关节:</p>
    <el-row style="height: 50px;">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="checkAllChange"
      :border="true" >全选
      </el-checkbox>
    </el-row>

    <el-checkbox-group v-model="checkedJoints" @change="checkedItemChange" style="height: 80px;display: flex; flex-wrap:wrap;align-content:space-between;">
      <el-checkbox v-for="item in joints" :key="item" :label="item" :border="true">{{
        item
      }}</el-checkbox>
    </el-checkbox-group>
    <el-row style="height: 40px;margin-top:10px;">
      <el-button @click="startDragging">开始拖动</el-button>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, toRaw, onMounted, computed, watch } from "vue";
import { ElMessage } from "element-plus";
import * as api from "@/api/control.js";
import { _throttle } from "@/utils/util.js";
import { useStore } from "vuex";
const store = useStore();
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedJoints = ref([])
const joints = ["关节一","关节二","关节三","关节四","关节五","关节六"]
const jointArr = reactive([
  {
    name: "关节一",
    joint: "J1",
    direction: "z",
    num: 0,
  },
  {
    name: "关节二",
    joint: "J2",
    direction: "x",
    num: 0,
  },
  {
    name: "关节三",
    joint: "B2",
    direction: "x",
    num: 0,
  },
  {
    name: "关节四",
    joint: "J5",
    direction: "x",
    num: 0,
  },
  {
    name: "关节五",
    joint: "J6",
    direction: "z",
    num: 0,
  },
  {
    name: "关节六",
    joint: "T1",
    direction: "x",
    num: 0,
  },
])
const axleArr = reactive([
  {
    name: "X",
    num: 0,
  },
  {
    name: "Y",
    num: 0,
  },
  {
    name: "Z",
    num: 0,
  }
])
const angleArr = reactive([
  {
    name: "Rx",
    num: 0,
  },
  {
    name: "Ry",
    num: 0,
  },
  {
    name: "Rz",
    num: 0,
  },
])
const jointTable =[{}]
const tcpTable =[{}]
const teachTable =computed(()=> {
  return [{
  pointName: pointName.value,
  n1:teacheType.value === 'jointSpace' ? jointArr[0].num:axleArr[0].num,
  n2:teacheType.value === 'jointSpace' ? jointArr[1].num:axleArr[1].num,
  n3:teacheType.value === 'jointSpace' ? jointArr[2].num:axleArr[2].num,
  n4:teacheType.value === 'jointSpace' ? jointArr[3].num:angleArr[0].num,
  n5:teacheType.value === 'jointSpace' ? jointArr[4].num:angleArr[1].num,
  n6:teacheType.value === 'jointSpace' ? jointArr[5].num:angleArr[2].num
}]
})

const checkAllChange = (val) => {
  checkedJoints.value = val ? joints : []
  isIndeterminate.value = false
}
const checkedItemChange = (val) => {
  const checkedLen = val.length
  checkAll.value = checkedLen === joints.length
  isIndeterminate.value = checkedLen > 0 && checkedLen < joints.length
  // console.log(toRaw(val), toRaw(checkedJoints.value));  //[ "关节一", "关节二"]
}
const startDragging = () => {
  let temC = []
  joints.forEach((item,i) => {
    temC[i] = checkedJoints.value.find((ele) => ele == item) ? 10 : 8
  })
  let params = {"mode":temC}
  // console.log(params);
  // api.setJointMode(params)

}
onMounted(() => {
  // for (let i = 0; i < 6; i++) {
  //   jointArr[i].num = computed(() => {
  //     return store.state.stateInfo.JointInfo[i]
  //   })
  // }
  // for (let i = 0; i < 3; i++) {
  //   axleArr[i].num = computed(() => {
  //     return store.state.stateInfo.CartInfo[i]
  //   })
  // }
  // for (let i = 3; i < 6; i++) {
  //   angleArr[i - 3].num = computed(() => {
  //     return store.state.stateInfo.CartInfo[i]
  //   })
  // }
  
})
</script>

<style lang="less" scoped>
  .teaching-joint{
    width: 100%;
    height:100%;
    background: #ffffff;
    padding: 10px;
    .check-text{
      font-size: 20px;
      margin-right: 10px;
      color:#303133 ;
    }
    .check-tag{
      border: 1px solid #DCDFE6;
      margin-right: 10px;
      // color:#606266 ;
    }
  }
</style>