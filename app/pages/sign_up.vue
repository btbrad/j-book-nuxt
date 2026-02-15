<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="w-[500px] h-[300px]">
      <div class="w-full text-center text-3xl font-bold m-6 pl-[120px]">注册</div>
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 4, offset: 4 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        labelAlign="left"
        @finish="onFinish"
      >
        <a-form-item
          label="昵称"
          name="nickname"
          :rules="[{ required: true, message: '请输入昵称!' }]"
        >
          <a-input v-model:value="formState.nickname" />
        </a-form-item>

        <a-form-item
          label="手机号"
          name="phone"
          :rules="[{ required: true, message: '请输入手机号!' }]"
        >
          <a-input v-model:value="formState.phone" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button class="w-full" type="primary" html-type="submit">注册</a-button>
          <div>已有账号？<NuxtLink to="/sign_in"><span class="text-blue-500">去登录</span></NuxtLink></div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $message } = useNuxtApp() 

interface FormState {
  nickname: string;
  phone: string;
  password: string;
}

const formState = reactive<FormState>({
  nickname: '',
  phone: '',
  password: '',
});
const onFinish = (values: FormState) => {
  console.log('Success:', values);
  // 请求注册接口
  registerFetch({
    method: 'POST',
    body: values,
    server: false
  }).then(({ data }: any) => {
    console.log('data', data)
    if (data?.value?.code === 1) {
      $message.error('注册失败')
      return
    }
    $message.success('注册成功')
    navigateTo('/sign_in')
  })
};

</script>

<style scoped>

</style>