<template>
  <div class="header-container" >
    <el-row class="header-row">
      <el-col  class="header-left" :span="10">
        <div class="logo" v-show="logoShow">
          <img class="title" src="@/assets/image/title.png" alt=""/>
        </div>
        <div class="arrow" v-show="!logoShow" >
          <img @click="backHome('/home')" class="arrow" src="@/assets/image/Icon_back.png" :width="50" alt=""/>
        </div>
      </el-col>
      <el-col  class="header-middle" :span="6">
      </el-col>
      <el-col  class="header-right" :span="8">
        <el-row class="navigation">
          <el-col :span="3"></el-col>
          <el-col :span="3"></el-col>
          <el-col :span="3">
            <el-button class="navigation-item" plain color="#2E3946" @click="robortPower">
              <img :width="26" src="@/assets/image/Icon_power.png" alt="">
              <!-- <p class="iconfont-text"> {{ power }}</p> -->
            </el-button>
          </el-col>
  
          <el-col :span="3">
            <el-button class="navigation-item" plain color="#2E3946" @click="roborConncet">
              <span class="iconfont robot-lianjie" :class="{success:connect && wsConnect,error:!connect}"></span>
            </el-button>
            <!-- <p class="iconfont-text"> {{ connect }}</p> -->
          </el-col>
          
          <el-col :span="3">
            <el-button class="navigation-item" plain color="#2E3946" >
              <span class="iconfont robot-zhuangtai"> </span>
            </el-button>
            <!-- <p class="iconfont-text">{{ state }}</p> -->
          </el-col>
          
          <el-col :span="3">
            <el-button class="navigation-item" plain color="#2E3946" @click="roborMode">
              <span class="iconfont robot-shuangmoshiqiehuan" :style="connect && wsConnect && mode == 'manual'? {'color':'green'} : connect && mode == 'teach'?  {'color':'yellow'}: {}"> </span>
            </el-button>
            <!-- <p class="iconfont-text"> {{ mode }}</p> -->
          </el-col>
  
          <el-col :span="3">
            <el-button class="navigation-item" plain color="#2E3946" @click="roborLog">
              <span class="iconfont robot-wj-rz" :class="{success:connect && wsConnect,error:!connect}"> </span>
            </el-button>
            <!-- <p class="iconfont-text"> 日志信息</p> -->
          </el-col>
  
          <!-- <el-col :span="3">
            <el-dropdown class="navigation-item dropdown" trigger="click" popper-class="navigation-dropdown">
            <el-button class="navigation-item-button" plain color="#2E3946">
              <span class="iconfont robot-caidan1"> </span>
            </el-button>
            <p class="iconfont-text"> 菜单</p>
            
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <span style="font-size: 20px; color: #fff;">机器人重启</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span style="font-size: 20px; color: #fff;">语言切换</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span style="font-size: 20px; color: #fff;">关于</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          </el-col> -->
  
          <el-col :span="3">
            <el-button  class="navigation-item" plain color="#2E3946" @click="roborStop">
              <span class="iconfont robot-jiting" style="color:red;"> </span>
            </el-button>
            <!-- <p class="iconfont-text"> 急停</p> -->
          </el-col>
        
        </el-row>
      </el-col>
    </el-row>
  </div>
  <Dialog v-model ="data.dialogVisible" :title="data.dialogTitle" :width="data.dialogWidth" @closeDialog="closeDialog">
    <div class="header-dialog-container" style="">
      <connectView v-show="data.dialogTitle == '连接机器人'" @closeDialog="closeDialog"></connectView>
      <logView v-show="data.dialogTitle == '日志输出'" />
    </div>
    
  </Dialog >
 
  </template>
  
  <script setup>
  import { reactive,onMounted,toRaw,computed,ref,watch} from "vue";
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { ElMessage } from 'element-plus'
  import { Dialog } from '@/components/Dialog'
  import connectView from './components/connectView.vue'
  import logView from './components/logView.vue'
  import * as api from "@/api/control.js";
  import {formatNumber} from '@/utils/util'
  const router= useRouter()
  const store = useStore();
  const props = defineProps({
  })
  
  const data = reactive({
    dialogTitle: "连接机器人",
    dialogVisible: false,
    logVisiable:false, //日志可视否
    dialogWidth: '40%',
    
  })
 const logoShow = computed(() => 
      { return store.state.tagView.navigation === '/home' && store.state.tagView.logoShow}  //  /home
    )
  
  const power = computed(() => {
    return store.state.user.devicePower?true:false
  })
  const wsConnect = computed(() => {
    return store.state.stateInfo.websocketLinkFlag
  })
  
  const connect = computed(() => {
    return store.state.user.deviceConnect == "已连接"?true:false
  })
  const state = computed(() => {
    return store.state.stateInfo.deviceState
  })
  const mode = computed(() => {
    return store.state.stateInfo.deviceMode
  })
  
  const user = computed(() => {
    return store.state.user.token ? "已登录" : "未登录"
  })

  const robortPower = () => {
  
  }
  
  const roborConncet = () => {
    data.dialogTitle = "连接机器人"
    data.dialogVisible = true
  }
  
  const roborMode = () => {
    
  }
  
  const roborLog = () => {
    data.dialogVisible = true
    // data.logVisiable = true
    data.dialogWidth = '50%'
    data.dialogTitle = "日志输出"
  }
  
  const roborStop = () => {
    
  }
  const closeDialog = (val)=> {
    data.dialogVisible = false
    // if(val == 'connect') {
    //   data.dialogVisible = false
    // }else if(val == 'log') {
    //   data.logVisiable = false
    // }
  }
  
  const backHome =(path) => {
    store.commit('tagView/setControlModeShow',false);
    store.commit('tagView/setLogoShow',true);
    router.push('/home')
    // router.push('/home')
  }

  const getPointsList = () => {
  
  api.getJointPoints().then((res) => {
    // console.log("points",res, res.points == null, res.points === null);  //true, true
    if(res && res.points && res.points != null){
      // saveTable = reactive([])
      if(saveTable.length) {saveTable.splice(0,saveTable.length)}
      for(let key in res.points){
        let val =  formatNumber(res.points[key])
        store.dispatch("teaching/getTeachPoint", {
          name: key,
          val: val,
        })
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
      }
    }
  }).catch((err) => {console.log(err);})
}
 
  onMounted(() => {
    getPointsList()
  })
  </script>
  
  <style lang="less" scoped>
  
  @media (max-width: 1500px) {
    .logo {
      display: none;
    }
  }
  
  // style="background-color: #2E3946;"
  .header-container {
      width: 100%;
      height: 100%;
      .header-row{
        width: 100%;
       height: 100%;
       .header-left{
        height: 100%;
       }
       .header-middle{
        height: 100%;
       }
       .header-right{
        height: 100%;
        .navigation{
          flex: none;
         height: 100%;
        //  background-color:rgb(234, 235, 237);
         .navigation-item{
          height: 100%;
          width: 90%;
          border: none;
          display: block;
          box-shadow: 4px 0px 4px 2px rgba(0,0,0,0.5) ;
          .robot-lianjie,.robot-wj-rz {
            &.success {
              color:green;
            }
          }
          // border-right: 2px;
          // border-radius: 0;
         }
         .navigation-item .dropdown{
          height: 100%;
          width: 90%;
          display: block;
         }
        }
       }
      }
  }
  </style>
  