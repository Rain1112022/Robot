<template>
  <div class="tcp-position">
    <el-card class="tcp-position-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 28px;font-weight: 600;">Tcp位置控制</span>
        </div>
      </template>
      <div class="card-body">
        <el-row class="top">
          <el-col :span="8" v-for="item in data.axleArr" :key="item">
            <p style="font-size: 14px;color: #0075FF; text-align: center;width: 110px;">{{ item.name }}</p>
            <el-row>
              <el-col :span="20">
                <el-input-number v-model="item.num" :precision="3" :controls="false" style="width: 110px;" />
              </el-col>
              <el-col :span="4" style="display: flex; align-items: center;">
                <span style="font-size: 14px;">mm</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="bottom">
          <el-col :span="12">
            <div class="handle-z">
              <button @click="clickControl(2, 'arrow-up-z', true)" class="arrow-up-z" id="arrow-up-z"></button>
              <button @click="clickControl(2, 'arrow-down-z', false)" class="arrow-down-z" id="arrow-down-z"></button>
              <img style="height: 80%" src="@/assets/image/handle_z.png" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="handle-xy">
              <button @click="clickControl(1, 'arrow-up-xy', true)" class="arrow-up-xy" id="arrow-up-xy"></button>
              <button @click="clickControl(1, 'arrow-down-xy', false)" class="arrow-down-xy" id="arrow-down-xy"></button>
              <button @click="clickControl(0, 'arrow-left-xy', true)" class="arrow-left-xy" id="arrow-left-xy"></button>
              <button @click="clickControl(0, 'arrow-right-xy', false)" class="arrow-right-xy"
                id="arrow-right-xy"></button>
              <img style="height: 80%" src="@/assets/image/handle_xy.png" alt="">
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>

</template>

<script setup>
import { ref, reactive, toRaw, onMounted, computed, inject, watch } from "vue";
import { ElMessage } from 'element-plus'
import * as api from '@/api/control.js'
import {_throttle} from '@/utils/util.js'
import { useStore } from 'vuex';
const store = useStore();
const data = reactive({
  axleArr: [{
    name: 'X',
    num: 0,
  }, {
    name: 'Y',
    num: 0,
  }, {
    name: 'Z',
    num: 0,
  },],
  clickStep: 1, //没用到
  isSuccess: true,
  reqMoveArr: [0, 0, 0, 0, 0, 0], //请求的tcp位置信息
  resMoveArr: [{ //响应的关节位置信息
    name: '关节一',
    joint: 'J1',
    direction: 'z',
    num: 0
  }, {
    name: '关节二',
    joint: 'J2',
    direction: 'x',
    num: 0
  }, {
    name: '关节三',
    joint: 'B2',
    direction: 'x',
    num: 0
  }, {
    name: '关节四',
    joint: 'J5',
    direction: 'x',
    num: 0
  }, {
    name: '关节五',
    joint: 'J6',
    direction: 'z',
    num: 0
  }, {
    name: '关节六',
    joint: 'T1',
    direction: 'x',
    num: 0
  },],
  CartInfo: []

})
const emit = defineEmits(["setRotation"]);
data.CartInfo = computed(() => {
  return store.state.stateInfo.CartInfo
})
watch(
  () => data.CartInfo,
  (newVal, oldVal) => {
    // console.log("监听CartInfo", toRaw(newVal));
    data.CartInfo.forEach((item, index) => {
      if (index < 3) {
        data.reqMoveArr[index] = item
        data.axleArr[index].num = item
      } else {
        data.reqMoveArr[index] = item
      }
    })
  }
)

const clickControl = _throttle((i, val, flag)=> {
 // console.log("i, val, flag",i, val, flag); //2 arrow-up-z true
 let arrowTemp = document.getElementById(val)
  arrowTemp.style.opacity = 0.5
  setTimeout(() => {
    arrowTemp.style.opacity = 0
  }, 100)
  data.reqMoveArr[i] = flag ? ++data.reqMoveArr[i] : --data.reqMoveArr[i]
  let params = { movj: data.reqMoveArr }
  api.tcpPosition(params).then((res) => {
    console.log("tcp位置步进", res)
    if (res.STATUS == 'SUCCESS') {
      // 响应成功，返回成功后的关节信息，然后把关节信息（resMoveArr）传入函数，使模型转动
      emit("setRotation", flag ? data.resMoveArr[i].num : -data.resMoveArr[i].num, data.resMoveArr[i].joint, data.resMoveArr[i].direction);
      // data.axleArr[i].num = flag ?  data.axleArr[i].num++ :  data.axleArr[i].num--
      //处理响应的关节位置信息
      ElMessage({
        message: `${data.axleArr[i].name}运动完成`,
        type: 'success',
        duration: 1000,
      })
    }

  }).catch((error) => {
    console.log(error);
  })
}, 2000, 1)


// onMounted(async () => {
//  data.CartInfo = computed(() => {
//     return store.state.stateInfo.CartInfo
//   })
//   data.CartInfo.forEach((item, index) => {
//     if (index < 3) {
//       data.reqMoveArr[index] = item
//       data.axleArr[index].num = item
//     } else {
//       data.reqMoveArr[index] = item
//     }
//   })
//   // console.log("末端状态",toRaw(data.CartInfo),);
//   // console.log(toRaw(data.axleArr));
//   // console.log(toRaw(data.reqMoveArr));
// });



</script>

<style lang="less" scope>
.tcp-position-card {
  width: 430px;
  height: 320px;
  margin-bottom: 20px;

  .el-card__header {
    padding: 10px;
  }

  .el-card__body {
    padding: 10px;
    width: 100%;
    height: calc(100% - 60px);

    .card-body {
      width: 100%;
      height: 100%;

      .bottom {
        margin-top: 10px;

        .el-col {
          display: flex;
          justify-content: center;

          .handle-z {
            position: relative;
            width: fit-content;
            height: fit-content;

            .arrow-up-z {
              position: absolute;
              top: 0;
              left: 0;
              width: 64px;
              height: 60px;
              outline: none;
              border-radius: 50px 50px 0 0;
              opacity: 0;
              border: 0;
              background-color: cadetblue;
            }

            .arrow-down-z {
              position: absolute;
              bottom: 10px;
              left: 0;
              width: 64px;
              height: 60px;
              outline: none;
              border-radius: 0 0 50px 50px;
              opacity: 0;
              border: 0;
              background-color: cadetblue;
            }
          }

          .handle-xy {
            position: relative;
            width: fit-content;
            height: fit-content;

            .arrow-up-xy {
              position: absolute;
              top: 0px;
              left: 50px;
              width: 60px;
              height: 60px;
              outline: none;
              border-radius: 50px 50px 0 0;
              opacity: 0;
              border: 0;
              background-color: cadetblue;
            }

            .arrow-down-xy {
              position: absolute;
              bottom: 10px;
              left: 50px;
              width: 60px;
              height: 60px;
              outline: none;
              border-radius: 0 0 50px 50px;
              opacity: 0;
              border: 0;
              background-color: cadetblue;
            }

            .arrow-left-xy {
              position: absolute;
              top: 50px;
              left: 0;
              width: 60px;
              height: 60px;
              outline: none;
              border-radius: 50px 0 0 50px;
              opacity: 0;
              border: 0;
              background-color: cadetblue;
            }

            .arrow-right-xy {
              position: absolute;
              top: 50px;
              right: 0;
              width: 60px;
              height: 60px;
              outline: none;
              border-radius: 0 50px 50px 0;
              opacity: 0;
              border: 0;
              background-color: cadetblue;
            }
          }
        }

      }
    }
  }
}
</style>
