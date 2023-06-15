<template>
  <el-form
              ref="ruleFormRef"
              label-width="100px"
              :model="ruleForm"
              :rules="rules"
              style="max-width: 460px"
            >
              <el-form-item label="用户名" prop="username" >
                <el-select v-model="ruleForm.username"  placeholder="请选择" clearable>
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                </el-select>
              </el-form-item>
              <el-form-item label="密码" prop="password" >
                <el-input v-model="ruleForm.password"
                type="password"
                autocomplete="off" />
              </el-form-item>
              <el-form-item label="机器人名称" prop="robotId">
                <el-input v-model="ruleForm.robotId" />
              </el-form-item>
              <el-form-item label="机器人IP" prop="robotIP">
                <el-input v-model="ruleForm.robotIP" />
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
          >
          提交</el-button
        >
               <el-button @click="cancleForm(ruleFormRef)">取消</el-button>
               </el-form-item>
    </el-form>

    <!-- <el-result
      icon="success"
      title="Success Tip"
          sub-title="Please follow the instructions"
        >
          <template #extra>
            <el-button type="primary">Back</el-button>
          </template>
      </el-result> -->
</template>

<script setup>
import { reactive, onMounted, toRaw, computed, ref, } from "vue";
import { useStore } from 'vuex';
import {getIP} from '@/utils/util'
const store = useStore();
const ruleFormRef = ref(null)
const emit = defineEmits(["closeDialog"]);
const props = defineProps({
})

const ruleForm = reactive({
  username: '管理员',
  password: '123456',
  robotId: '001',
  robotIP: '192.169.7.32',
})

const rules = reactive({
  username: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }],
  robotId: [{ required: true, trigger: 'blur' }],
  robotIP: [{ required: true, trigger: 'blur' }],
})

const options = [{
  value: '管理员',
  label: '管理员',
},
{
  value: '技术员',
  label: '技术员',
},
{
  value: '操作员',
  label: '操作员',
},]


const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      store.dispatch("user/userLogin", { passwd: 123456 }).then(() => {
        console.log("登录成功", )
        if(process.env.VITE_APP_WS_BASE_URL.search(ruleForm.robotIP)){
          console.log("");
          emit("closeDialog", 'connect')
        }else{
          ElMessage({
          message: 'IP错误',
          type: 'error',
          duration: 2000,
        })
        return false
        }
        
      }).catch(err => {
        ElMessage({
          message: '登录失败',
          type: 'error',
          duration: 2000,
        })
      })  
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const cancleForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  emit("closeDialog", 'connect')
}


onMounted(() => {
//   getIP(function(ip){
//   console.log("得到的本地IP :" + ip); // 192.168.1.80
// });
})





</script>


<style lang="less" scoped>
</style>