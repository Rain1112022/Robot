<template>
  <div class="teaching-drag-point">
    <div class="teaching-drag-point-set">
      <el-row style="height: 50px;margin-top:10px;">
      <el-col :span="4">
        类型：
        <el-radio-group v-model="teacheType" @change="radioChange">
          <el-radio label="jointSpace" border>关节</el-radio>
          <el-radio label="tcpSpace" border>Tcp</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="3">
        <el-button @click="startDragging">开始拖动</el-button>
      </el-col>
    </el-row>

  <!--highlight-current-row  @current-change="handleCurrentChange" -->
  <el-table :data="teachTable" border  style="width: 900px;" :header-cell-style = "headerStyle">
    <el-table-column type="index" label="" width="50" />
    <el-table-column  prop="pointName" label="点位" width="100" >
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
    </div>
    
  <div class="teaching-drag-point-show">
    <p>已保存的示教点</p>
    <el-table  :data="saveTable" border  style="width: 900px;" :header-cell-style = "headerStyle">
    <el-table-column type="index" label="" width="50" />
    <el-table-column  prop="pointName" label="点位" width="100" >
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
  </div>
  
  </div>
</template>

<script setup>
import { ref, reactive, toRaw, onMounted, computed, watch,onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import * as api from "@/api/control.js";
import { _throttle } from "@/utils/util.js";
import { useStore } from "vuex";
import { keyBy } from "lodash";
const store = useStore();
const teacheType = ref("jointSpace")
const pointName = ref("P1")
const currentRow = ref()
const lableList = ["J1/X","J2/Y","J3/Z","J4/Rx","J5/Ry","J6/Rz"]

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
const headerStyle =  ({row, column, rowIndex, columnIndex})=> {
  // console.log(toRaw(row), toRaw(column), toRaw(rowIndex), toRaw(columnIndex));
      if ( rowIndex === 0) {
        return {backgroundColor: '#c6e2ff',color:'#303133'}; //蓝色
      } 
}

// const handleCurrentChange = (val) => {
//   console.log(toRaw(val));
//   currentRow.value = val
// }
const startDragging = () => {
 //api.getJointPoints   saveJointPoint

}
const radioChange = (val) => {
  // console.log(toRaw(val),toRaw(teacheType.value)); //tcpSpace/jointSpace
  if(val === 'tcpSpace'){
    // console.log("tcpSpace");
  }else if(val === 'jointSpace'){
    // console.log("jointSpace");
  }
}
const saveTeachPoint =(index, row) => {
  let params = {
    pointName: row.pointName,
    space: teacheType.value
  }
  console.log("STP", params);
  store.dispatch("teaching/getTeachPoint",{
      name:row.pointName,
      val:[row.n1,row.n2,row.n3,row.n4,row.n5,row.n6],
  })

  // api.saveJointPoint(params).then((res) => {
  //   if (res) {
  //     console.log(res);
  //     api.getJointPoints.then((res) => {
  //       if (res && res.points && res.points.length) {
  //         saveTable = []
  //         for (let key of res.points) {
  //           saveTable.push({
  //             pointName: key,
  //             n1: res.points[key][0],
  //             n2: res.points[key][1],
  //             n3: res.points[key][2],
  //             n4: res.points[key][3],
  //             n5: res.points[key][4],
  //             n6: res.points[key][5],
  //           })
  //         }
  //       } else {
  //         saveTable = []
  //       }
  //     }).catch((err) => { console.log(err); })
  //     store.dispatch("teaching/getTeachPoint", {
  //       name: row.pointName,
  //       val: res[row.pointName],
  //     })
  //   }
  // })
  // console.log(toRaw(index),toRaw(row));
  // localStorage.setItem(`${pointName.value}`, row)


// console.log(toRaw(saveTable));
}
const delTeachPoint = (index, row) => {
  // console.log("删除",toRaw(index),toRaw(row));
  // saveTable.splice(index, 1)
}

onMounted(() => {
  let temp = {
        points: [
          { "point1": [24057, -2, -8, -10, -5, -5] },
          { "point2": [109437, -245185, 1480999, 88554, 18873, 18856] }
        ]
      }
      temp.points.forEach((ele,i) => {
        for(let key in ele){
          saveTable[i] = {
          pointName:key,
          n1:ele[key][0],
          n2:ele[key][1],
          n3:ele[key][2],
          n4:ele[key][3],
          n5:ele[key][4],
          n6:ele[key][5],
        }
      }
      })
    
  // api.getJointPoints.then((res) => {
  //   if(res && res.points && res.points.length){
  //     saveTable = []
  //     for(let key in res.points){
  //       saveTable.push({
  //         pointName:key,
  //         n1:res.points[key][0],
  //         n2:res.points[key][1],
  //         n3:res.points[key][2],
  //         n4:res.points[key][3],
  //         n5:res.points[key][4],
  //         n6:res.points[key][5],
  //       })
  //     }
  //   }else{
  //     let temp = {
  //       points: [
  //         { "point1": [24057, -2, -8, -10, -5, -5] },
  //         { "point2": [109437, -245185, 1480999, 88554, 18873, 18856] }
  //       ]
  //     }
  // temp.points.forEach((ele,i) => {
  //       console.log(ele);
  //       for(let key of ele){
  //         saveTable[i] = {
  //         pointName:key,
  //         n1:ele[key][0],
  //         n2:ele[key][1],
  //         n3:ele[key][2],
  //         n4:ele[key][3],
  //         n5:ele[key][4],
  //         n6:ele[key][5],
  //       }
  //     }
  //     })
  // }).catch((err) => {console.log(err);})

})

// onBeforeUnmount(() => {
//   let params = {drag:false,mode:[10,10,10,10,10,10]}
//   api.setJointDrag(params).then((res)=> {
//     if(res.STATUS === 'SUCCESS') {
//       store.dispatch("stateInfo/deviceMode","manual" )
//     }
//   })
// })
</script>

<style lang="less" scoped>
  .teaching-drag-point{
    width: 100%;
    height:100%;
    // background: #ffffff;
    padding: 10px;
    .teaching-drag-point-set{
      width: 100%;
      height:25%;
    }
  }
</style>