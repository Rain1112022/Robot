
<template>
  <div class="header-container" >
    <el-row>
      <el-col :span="16">
        <div class="logo" v-show="data.currentRouter == '/home'">
          <img class="title" src="@/assets/image/title.png" alt=""/>
        </div>
        <div class="arrow" v-show="data.currentRouter != '/home'" >
          <img @click="backHome('/home')" class="arrow" src="@/assets/image/Icon_back.png" alt=""/>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="navigation">
          <el-dropdown trigger="click" popper-class="navigation-dropdown">
            <img class="power" src="@/assets/image/icon_power.png" alt="" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <img class="re" src="@/assets/image/icon_re.png" alt="" />
                  <span style="font-size: 30px; color: #fff;">机器人重启</span>
                </el-dropdown-item>
                <el-dropdown-item divided :disabled = "data.disabledFlag">
                  <img class="sign-in" src="@/assets/image/icon_sign-in.png" alt="" />
                  <span style="font-size: 30px; color: #fff;" @click="loginRobot">登录</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <img class="language" src="@/assets/image/icon_language.png" alt="" />
                  <span style="font-size: 30px; color: #fff;">语言切换</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <img class="about" src="@/assets/image/icon_about.png" alt="" />
                  <span style="font-size: 30px; color: #fff;">关于</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
      
          <img class="back" src="@/assets/image/icon_back.png" alt="" />
          <img class="editor" src="@/assets/image/icon_editor.png" alt="" />
          <img class="help" src="@/assets/image/icon_help.png" alt="" />
          <img class="port" src="@/assets/image/icon_port.png" alt="" />
        </div>
      </el-col>
    </el-row>
  </div>
  </template>
  
  <script setup>
  import { reactive,onMounted,toRaw,computed,} from "vue";
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { ElMessage } from 'element-plus'
  const router= useRouter()
  const store = useStore();
  const props = defineProps({
    
  })
  const data = reactive({
    currentRouter:'',
    disabledFlag:false,
  })
  const backHome =(path) => {
    router.push(path)
  }
  const loginRobot = () => {
    if (!data.disabledFlag) {
      store.dispatch("user/userLogin", { passwd: 123456 }).then(() => {
        // console.log("登录成功", )
        data.disabledFlag = true
        ElMessage({
          message: '登录成功',
          type: 'success',
          duration: 2000,
        })
      })
    }else{
      ElMessage({
          message: '已登录',
          type: 'success',
          duration: 2000,
        })
    }
  }
  onMounted(() => {
    data.currentRouter = computed(() => 
       store.state.tagView.navigation
    )
    const hasToken = window.sessionStorage.getItem("token")
    if(!hasToken) {
      data.disabledFlag = false
      ElMessage({
          message: '请先登录',
          type: 'warning',
          duration: 2000,
        })
    }else{
      data.disabledFlag = true
      ElMessage({
          message: '已登录',
          type: 'success',
          duration: 2000,
        })
    }
  })
  </script>
  
  
  <style lang="less">
  // style="background-color: #2E3946;"
  .header-container {
      width: 100%;
      height: 100%;
      .el-row{
        width: 100%;
       height: 100%;
       .el-col{
        height: 100%;
        .navigation{
          width: 100%;
         height: 100%;
         display: flex;
         justify-content: space-between;
         align-items: center;
        }
       }
       
      }
  }
  </style>
  