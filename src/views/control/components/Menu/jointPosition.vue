<template>
  <div class="joint-position">
    <el-card class="joint-position-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 24px; font-weight: 600">关节点动控制</span>
        </div>
      </template>
      <div class="card-body">
        <el-row class="card-body-head">
          <el-col class="step-left" :span="6">
            <p class="step-text">{{ "步进值：" }}</p>
          </el-col>
          <el-col class="step-right" :span="17">
            <el-radio-group v-model="radioStep">
              <el-radio :label="1" border size="small">0.1</el-radio>
              <el-radio :label="5" border size="small">0.5</el-radio>
              <el-radio :label="10" border size="small">1</el-radio>
            </el-radio-group>
            <!-- <el-input-number
              v-model="data.clickStep"
              :step="0.5"
              step-strictly
              :min="0.1"
              :max="1"
              :precision="2"
              @change="stepChange"
            /> -->
          </el-col>
        </el-row>
        <el-row class="card-body-top" >
          <el-row
            v-for="(item, index) in jointArr"
            :key="item"
            class="joint-status"
          >
            <el-col class="joint-left" :span="6">
              <p class="joint-text">{{ item.name }}</p>
            </el-col>
            <el-col class="joint-middle" :span="10">
              <el-row class="joint-value">
                <span>{{ Number(item.num).toFixed(3) }}</span>
              </el-row>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="7" class="joint-right">
              <el-button-group >
                <el-button type="primary" @click="controlJoint(item,index, 'minus')">
                  <span class="joint-right-btn">{{ '-' }}</span>
                </el-button>
                <el-button type="primary" @click="controlJoint(item,index,'plus')" >
                  <span class="joint-right-btn">{{ '+' }}</span>
                </el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-row>

        <el-row class="card-body-bottom">
          <el-col :span="11" class="tcp-status">
            <el-row
              v-for="(item, index) in axleArr"
              :key="item"
              class="tcp-position-status"
            >
              <el-col class="tcp-left" :span="4">
                <p class="tcp-text">{{ item.name }}</p>
              </el-col>

              <el-col class="tcp-right" :span="20">
                <el-row class="tcp-value">
                  <span>{{ Number(item.num).toFixed(3) }}</span>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11" class="tcp-status">
            <el-row
              v-for="(item, index) in angleArr"
              :key="item"
              class="tcp-gesture-status"
            >
              <el-col class="tcp-left" :span="4">
                <p class="tcp-text">{{ item.name }}</p>
              </el-col>

              <el-col class="tcp-right" :span="20">
                <el-row class="tcp-value">
                  <span>{{ Number(item.num).toFixed(3) }}</span>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, toRaw, onMounted, computed, inject, watch } from "vue";
import { ElMessage } from "element-plus";
import * as api from "@/api/control.js";
import { _throttle } from "@/utils/util.js";
import { useStore } from "vuex";
const store = useStore();
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
const radioStep = ref(1)

const data = reactive({
  clickStep: 2,
  isSuccess: true,
});
const emit = defineEmits(["setJogMove"]);

onMounted( () => {
for (let i = 0; i<6;i++){
  jointArr[i].num = computed(() => {
    return store.state.stateInfo.JointInfo[i]
  })
}
for (let i = 0; i<3;i++){
  axleArr[i].num = computed(() => {
    return store.state.stateInfo.CartInfo[i]
  })
}
for (let i = 3; i<6;i++){
  angleArr[i - 3].num = computed(() => {
    return store.state.stateInfo.CartInfo[i]
  })
}
});

const controlJoint =(info,i, singal) => {
  // console.log(toRaw(info),toRaw(i), toRaw(singal));
  // console.log("radioStep",radioStep.value);
  if (data.isSuccess) {
    data.isSuccess = false
    let val = {
      "info": info,
      "step": radioStep.value
    }
    emit("setJogMove",val)
  let params =  {
    "jog": {
      "step": radioStep.value,
      "joint": i,
      "direction": singal == 'plus'? 1: -1,  //1正、-1负
    }
  }
  // console.log("jog",toRaw(params));
  api.jogMove(params).then((res) => {
    console.log("jog",res);
    if (res && res.STATUS == "SUCCESS"){
      data.isSuccess = true
    }else{
      
    }
  }).catch((err) => {
    console.log(err);
  })
  }
 


  // let tempJ = store.state.stateInfo.JointInfo
  // singal == 'plus'? tempJ[i]++: tempJ[i]--
  // let params = {movj:tempJ}
  // api.jointPosition(params).then((res) => {
  //   if (res.STATUS == 'SUCCESS') {
  //     data.isSuccess = true
  //   }else if(res.STATUS == 'FAIL'){
  //     return
  //   }
  // }).catch((error) => {
  //   console.log(error);
  // })
}

const stepChange = (val) => {
// console.log(val); //1.05
  // data.clickStep = val
  // radioStep.value 
}

</script>

<style lang="less" scope>
.joint-position {
  width: 100%;
  height: 100%;

  .joint-position-card {
    width: 100%;
    height: 100%;

    .el-card__header {
      padding: 10px;
      height: 50px;
      background: rgb(234, 235, 237);
      // border-bottom: 2px;
    }

    .el-card__body {
      width: 100%;
      height: calc(100% - 50px);
      .card-body {
        width: 100%;
        height: 100%;
        .card-body-head {
          width: 100%;
          height: 10%;
          .step-left,
          .step-right {
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
          }
          .step-left {
            .step-text {
              font-size: 16px;
              color: #0075ff;
              font-weight: 600;
            }
          }
        }
        .card-body-top {
          width: 100%;
          height: 60%;
          .joint-status {
            width: 100%;
            height: calc(100% / 6);
            .joint-left,
            .joint-middle{
              height: 100%;
              display: flex;
              justify-content: start;
              align-items: center;
            }
            .joint-right {
              height: 100%;
              display: flex;
              justify-content: end;
              align-items: center;
            }

            .joint-left .joint-text {
              font-size: 16px;
              color: #0075ff;
              font-weight: 600;
            }
            .joint-middle .joint-value {
              padding: 6px;
              width: 100%;
              border: var(--el-border);
              border-radius: var(--el-border-radius-base);
              display: flex;
              justify-content: center;
              align-items: center;
              color: var(--el-text-color-regular);
            }
            .joint-right .joint-right-btn{
              font-size: 16px;
            }
          }
        }
        .card-body-bottom {
          padding-top: 10px;
          width: 100%;
          height: 30%;
          .tcp-status {
            height: 100%;

            .tcp-position-status{
              display: flex;
              justify-content: start;
              align-items: center;
            }
            .tcp-gesture-status{
              display: flex;
              justify-content: end;
              align-items: center;
            }
            .tcp-position-status,
            .tcp-gesture-status {
              height: calc(100% / 3);
              
              .tcp-left,
              .tcp-right {
                font-size: 16px;
                color: #0075ff;
              }
              .tcp-right .tcp-value{
                padding: 6px;
              width: 100%;
              border: var(--el-border);
              border-radius: var(--el-border-radius-base);
              display: flex;
              justify-content: center;
              align-items: center;
              color: var(--el-text-color-regular);
              }
            }
          }
        }
      }
    }
  }
}
</style>
