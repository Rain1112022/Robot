<template>
  <div class="teaching-drag-point">
    <el-row class="teaching-drag-point-container">
      <el-col class="teaching-drag-point-set" :span="12">
        <el-row style="height: 50px;">
          <div class="point-set-type">
            <span class="point-set-type-text">类型：</span>
            <el-radio-group v-model="teacheType" @change="radioChange">
              <el-radio label="jointSpace" border ><span class="point-set-type-radio">关节空间</span></el-radio>
              <el-radio label="tcpSpace" border><span class="point-set-type-radio">Tcp空间</span></el-radio>
            </el-radio-group>
          </div>
          <div class="point-teach-start" style="padding-left:30px;">
            <el-button type="primary" plain @click="startTeaching(teachText)"> 
              {{teachText}}
            </el-button>
          </div>
        </el-row>
        <!--highlight-current-row  @current-change="handleCurrentChange" -->
        <el-table :data="teachTable" border  style="width: 95%;" :header-cell-style = "headerStyle">
          <el-table-column  prop="pointName" label="点位" width="120" show-overflow-tooltip>
            <template #default ="scope">
              <el-input v-model="pointName" />
            </template>
          </el-table-column>
          <el-table-column prop="n1" :label="lableList[0]" width="100" />
          <el-table-column prop="n2" :label="lableList[1]" width="100" />
          <el-table-column prop="n3" :label="lableList[2]" width="100" />
          <el-table-column prop="n4" :label="lableList[3]" width="100" />
          <el-table-column prop="n5" :label="lableList[4]" width="100" />
          <el-table-column prop="n6" :label="lableList[5]" width="100" />
          <el-table-column  label="操作" >
            <template #default ="scope">
              <el-button @click="saveTeachPoint(scope.$index, scope.row)">保存示教点</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col class="teaching-drag-point-show" :span="12">
          <p class="point-show-text">已保存的示教点</p>
          <el-table  :data="saveTable" border max-height="620px" style="width:95%;" :header-cell-style = "headerStyle">
            <el-table-column type="index" label="" width="50" />
            <el-table-column  prop="pointName" label="点位" width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="n1" :label="lableList[0]" width="100" />
            <el-table-column prop="n2" :label="lableList[1]" width="100" />
            <el-table-column prop="n3" :label="lableList[2]" width="100" />
            <el-table-column prop="n4" :label="lableList[3]" width="100" />
            <el-table-column prop="n5" :label="lableList[4]" width="100" />
            <el-table-column prop="n6" :label="lableList[5]" width="100" />
            <el-table-column  label="操作"  >
              <template #default ="scope">
                <el-button @click="delTeachPoint(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, toRaw, onMounted, computed, watch,onBeforeUnmount } from "vue";
import { ElMessage,ElMessageBox } from "element-plus";
import * as api from "@/api/control.js";
import {formatNumber} from '@/utils/util'
import { useStore } from "vuex";
import { onBeforeRouteLeave } from 'vue-router'

const store = useStore();
const teacheType = ref("jointSpace")
const pointName = ref("P1")
const currentRow = ref()
const lableList = ["J1/X","J2/Y","J3/Z","J4/Rx","J5/Ry","J6/Rz"]
// const teachText = ref('开始拖动示教')

const saveTable = reactive([])

const teachTable =computed(()=> {
  return [{
    pointName: pointName.value,
    n1:teacheType.value === 'jointSpace' ? store.state.stateInfo.JointInfo[0]:store.state.stateInfo.CartInfo[0],
    n2:teacheType.value === 'jointSpace' ? store.state.stateInfo.JointInfo[1]:store.state.stateInfo.CartInfo[1],
    n3:teacheType.value === 'jointSpace' ? store.state.stateInfo.JointInfo[2]:store.state.stateInfo.CartInfo[2],
    n4:teacheType.value === 'jointSpace' ? store.state.stateInfo.JointInfo[3]:store.state.stateInfo.CartInfo[3],
    n5:teacheType.value === 'jointSpace' ? store.state.stateInfo.JointInfo[4]:store.state.stateInfo.CartInfo[4],
    n6:teacheType.value === 'jointSpace' ? store.state.stateInfo.JointInfo[5]:store.state.stateInfo.CartInfo[5]
  }]
})

const teachText = computed(() => {
  return store.state.stateInfo.deviceMode == 'teach' ?'退出拖动示教' :'开始拖动示教'
})


const headerStyle =  ({row, column, rowIndex, columnIndex})=> {
  // console.log(toRaw(row), toRaw(column), toRaw(rowIndex), toRaw(columnIndex));
      if ( rowIndex === 0) {
        return {backgroundColor: '#c6e2ff',color:'#303133'}; //蓝色
      } 
}

const radioChange = (val) => {
  // console.log(toRaw(val),toRaw(teacheType.value)); //tcpSpace/jointSpace
  if(val === 'tcpSpace'){
    // console.log("tcpSpace");
  }else if(val === 'jointSpace'){
    // console.log("jointSpace");
  }
}
//开始拖动示教
const startTeaching = (text) => {
  if (text == '开始拖动示教') {
    let params = {
      drag: true,
      mode: [10, 10, 10, 10, 10, 10]
    }
    api.setJointDrag(params).then((res) => {
      if(res.STATUS === 'SUCCESS') {
        teachText.value = '退出拖动示教'
        store.dispatch("stateInfo/getEnterTeach",true)
        // console.log("进入示教模式");
      }
    })
  }else if(text == '退出拖动示教'){
    let params = {
      drag: false,
      mode: [10, 10, 10, 10, 10, 10]
    }
    api.setJointDrag(params).then((res) => {
      if(res.STATUS === 'SUCCESS') {
        teachText.value = '开始拖动示教'
        store.dispatch("stateInfo/getEnterTeach",false)
        // console.log("进入示教模式");
      }
    })
  }

  
}

const saveTeachPoint =(index, row) => {
  let params = {
    pointName: row.pointName,
    space: teacheType.value
  }
  console.log("STP", params);
  let pn = saveTable.find((ele) => ele.pointName == row.pointName)
  if(pn) {
    ElMessage({
      message:'点位名称重复!',
      type:'error',
      duration: 2000
    })
  }
  api.saveJointPoint(params).then((res) => {
    if (res && res.STATUS === 'SUCCESS') {
      getPointsList()

    }
  })
  // console.log(toRaw(index),toRaw(row));
}

const getPointsList = () => {
  
  api.getJointPoints().then((res) => {
    console.log("points",res, res.points == null, res.points === null);  //true, true
    if(res && res.points && res.points != null){
      // saveTable = reactive([])
      if(saveTable.length) {saveTable.splice(0,saveTable.length)}
      for(let key in res.points){
        let val =  formatNumber(res.points[key])
        store.dispatch("teaching/getTeachPoint", {
          name: key,
          val: val,
        })
        saveTable.push({
          pointName:key,
          n1:val[0],
          n2:val[1],
          n3:val[2],
          n4:val[3],
          n5:val[4],
          n6:val[5],
        })
        pointName.value = pointName.value == key && /\d+/.exec(key) ? "P" + (Number(/\d+/.exec(key)[0]) + 1 ): "点位名称..."
      }
      
    } else {
      let temp = {
        points: {
          "beginP": [-6042, -52673, 31972, -5429, 88593, 5605],
          "endP": [26325, -47329, 40382, -8951, 88404, 1277],
          "midP1": [-8489, -28869, 16097, -45005, 87470, 258],
          "midP2": [34606, -25095, 15633, -48606, 90197, -422]
        }
      }
      for (let key in temp.points) {
        let val =  formatNumber(temp.points[key])
        store.dispatch("teaching/getTeachPoint", {
          name: key,
          val: val,
        })
        saveTable.push({
          pointName:key,
          n1:val[0],
          n2:val[1],
          n3:val[2],
          n4:val[3],
          n5:val[4],
          n6:val[5],
        })
      }
    }
  }).catch((err) => {console.log(err);})
}

onMounted(() => {
  getPointsList()
})

const delTeachPoint = (index, row) => {
  // console.log("删除",toRaw(index),toRaw(row));
  // saveTable.splice(index, 1)
}

onBeforeUnmount(() => {
  if(teachText.value == '退出拖动示教'){
    ElMessageBox.confirm('请先退出示教模式!', 'Warning', {
      confirmButtonText: '退出',
      // cancelButtonText: '取消',
      type: 'warning',
      center: true,
      customClass: 'toggle-project-modal',
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
        console.log('confirm');
        let params = {
          drag: false,
          mode: [10, 10, 10, 10, 10, 10]
        }
        api.setJointDrag(params).then((res) => {
          if (res.STATUS === 'SUCCESS') {
            teachText.value = '开始拖动示教'
            store.dispatch("stateInfo/getEnterTeach", false)
            // console.log("进入示教模式");
          }
        })
          done()
        } else {
          done()
        }
      }
    })
      .then(async () => {
        next()
      })
      .catch(() => {
        next()
      })
  }
})

onBeforeRouteLeave((to, from, next)=>{
})
</script>

<style lang="less" scoped>
  .teaching-drag-point{
    width: 100%;
    height:100%;
    // background: #ffffff;
    // padding: 10px;
    .teaching-drag-point-container{
      width: 100%;
      height:100%;
      .teaching-drag-point-set{
      height:100%;
      .point-set-type{
        // color:#303133 ;
        // font-size: 16px;
        .point-set-type-text{
          color:rgb(0, 0, 0); ;
          font-size: 20px;
        }
        .point-set-type-radio{
          color:rgb(48, 49, 51); ;
          font-size: 14px;
        }
      }
    }
    .teaching-drag-point-show{
      height:100%;
      .point-show-text{
        height: 50px;
        line-height: 50px;
        color:rgb(0, 0, 0); ;
        font-size: 20px;
      }
    }
    }
    
  }
</style>