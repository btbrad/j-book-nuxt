<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="w-[500px] h-[300px]">
      <div class="w-full text-center text-3xl font-bold m-6 pl-[120px]">登录</div>
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
          <a-button class="w-full" type="primary" html-type="submit">登录</a-button>
          <div>没有账号？<NuxtLink to="/sign_up"><span class="text-blue-500">去注册</span></NuxtLink></div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $message } = useNuxtApp() 

interface FormState {
  phone: string;
  password: string;
}

const formState = reactive<FormState>({
  phone: '',
  password: '',
});
const onFinish = (values: FormState) => {
  console.log('Success:', values);
  // 请求登录接口
  loginFetch({
    method: 'POST',
    body: values,
    server: false,
    key: 'loginFetch'
  }).then(({ data }: any) => {
    console.log('data', data)
    if (data?.value?.code === 1) {
      $message.error(data.value.msg)
      return
    }
    // 存储token
    const accessTokenCookie = useCookie('accessToken', { maxAge: 60 * 60 * 24 * 7 })
    accessTokenCookie.value = data.value.data.accessToken
    // 存储用户信息
    const userInfoCookie = useCookie('userInfo', { maxAge: 60 * 60 * 24 * 7 })
    userInfoCookie.value = data.value.data.userInfo
    $message.success('登录成功')
    navigateTo('/')
  })
};

</script>

<style scoped>

</style>