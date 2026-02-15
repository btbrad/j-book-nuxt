<template>
  <div class="min-h-screen w-full flex justify-center items-center relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
    <!-- 动态背景装饰 -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="bubble bubble-1"></div>
      <div class="bubble bubble-2"></div>
      <div class="bubble bubble-3"></div>
      <div class="bubble bubble-4"></div>
      <div class="bubble bubble-5"></div>
    </div>

    <!-- 主卡片 -->
    <div class="relative z-10 w-full max-w-md px-6">
      <!-- 玻璃态卡片 -->
      <div class="glass-card rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        <!-- 标题区域 -->
        <div class="text-center mb-8">
          <div class="inline-block mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow">
              <IconAntDesignUserAddOutlined class="text-3xl text-white" />
            </div>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">创建账号</h1>
          <p class="text-gray-300 text-sm">开启您的精彩旅程</p>
        </div>

        <!-- 表单 -->
        <a-form
          :model="formState"
          name="basic"
          layout="vertical"
          autocomplete="off"
          @finish="onFinish"
        >
          <a-form-item
            label=""
            name="nickname"
            :rules="[{ required: true, message: '请输入昵称!' }]"
          >
            <a-input
              v-model:value="formState.nickname"
              size="large"
              placeholder="请输入昵称"
              class="input-glow"
            >
              <template #prefix>
                <IconAntDesignUserOutlined class="text-gray-500" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label=""
            name="phone"
            :rules="[{ required: true, message: '请输入手机号!' }]"
          >
            <a-input
              v-model:value="formState.phone"
              size="large"
              placeholder="请输入手机号"
              class="input-glow"
            >
              <template #prefix>
                <IconAntDesignPhoneOutlined class="text-gray-500" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label=""
            name="password"
            :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <a-input-password
              v-model:value="formState.password"
              size="large"
              placeholder="请输入密码"
              class="input-glow"
            >
              <template #prefix>
                <IconAntDesignLockOutlined class="text-gray-500" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item class="mb-4">
            <a-button
              class="w-full h-12 text-base font-semibold rounded-xl border-none"
              type="primary"
              html-type="submit"
              :loading="loading"
            >
              <span v-if="!loading">立即注册</span>
              <span v-else>注册中...</span>
            </a-button>
          </a-form-item>

          <div class="text-center text-gray-300 text-sm">
            已有账号？
            <NuxtLink to="/sign_in" class="text-pink-400 hover:text-pink-300 font-semibold transition-colors">
              去登录
            </NuxtLink>
          </div>
        </a-form>
      </div>

      <!-- 底部提示 -->
      <div class="text-center mt-6 text-gray-400 text-xs">
        注册即表示您同意我们的
        <a href="#" class="text-pink-400 hover:text-pink-300">服务条款</a>
        和
        <a href="#" class="text-pink-400 hover:text-pink-300">隐私政策</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $message } = useNuxtApp()

const loading = ref(false)

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
  loading.value = true
  console.log('Success:', values);
  // 请求注册接口
  registerFetch({
    method: 'POST',
    body: values,
    server: false
  }).then(({ data }: any) => {
    console.log('data', data)
    loading.value = false
    if (data?.value?.code === 1) {
      $message.error('注册失败')
      return
    }
    $message.success('注册成功')
    navigateTo('/sign_in')
  }).catch(() => {
    loading.value = false
    $message.error('注册失败，请稍后重试')
  })
};
</script>

<style scoped>
/* 玻璃态卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
}

/* 输入框发光效果 */
.input-glow :deep(.ant-input),
.input-glow :deep(.ant-input-password .ant-input) {
  background: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  color: #1f2937 !important;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.input-glow :deep(.ant-input-affix-wrapper) {
  background: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
}

.input-glow :deep(.ant-input::placeholder) {
  color: rgba(107, 114, 128, 0.8) !important;
}

.input-glow :deep(.ant-input:focus),
.input-glow :deep(.ant-input-affix-wrapper-focused) {
  background: #ffffff !important;
  border-color: rgba(236, 72, 153, 0.8) !important;
  box-shadow:
    0 0 20px rgba(236, 72, 153, 0.25),
    0 0 40px rgba(236, 72, 153, 0.1) !important;
}

.input-glow :deep(.ant-input-password .ant-input) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* 按钮样式 */
:deep(.ant-btn-primary) {
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%) !important;
  border: none !important;
  box-shadow:
    0 4px 15px rgba(236, 72, 153, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
  transition: all 0.3s ease;
}

:deep(.ant-btn-primary:hover) {
  background: linear-gradient(135deg, #f472b6 0%, #a78bfa 100%) !important;
  box-shadow:
    0 6px 20px rgba(236, 72, 153, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
  transform: translateY(-2px);
}

:deep(.ant-btn-primary:active) {
  transform: translateY(0);
}

/* 错误状态样式 */
:deep(.ant-form-item-has-error .ant-input),
:deep(.ant-form-item-has-error .ant-input-affix-wrapper) {
  background: rgba(239, 68, 68, 0.1) !important;
  border-color: rgba(239, 68, 68, 0.5) !important;
}

/* 气泡动画 */
.bubble {
  position: absolute;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1));
  border-radius: 50%;
  animation: float 20s infinite ease-in-out;
  opacity: 0.3;
}

.bubble-1 {
  width: 80px;
  height: 80px;
  left: 10%;
  top: 20%;
  animation-delay: 0s;
}

.bubble-2 {
  width: 120px;
  height: 120px;
  right: 15%;
  top: 60%;
  animation-delay: 2s;
}

.bubble-3 {
  width: 60px;
  height: 60px;
  left: 20%;
  bottom: 20%;
  animation-delay: 4s;
}

.bubble-4 {
  width: 100px;
  height: 100px;
  right: 25%;
  top: 30%;
  animation-delay: 6s;
}

.bubble-5 {
  width: 90px;
  height: 90px;
  left: 50%;
  top: 10%;
  animation-delay: 8s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(1);
  }
  25% {
    transform: translateY(-30px) translateX(15px) scale(1.1);
  }
  50% {
    transform: translateY(-15px) translateX(-10px) scale(0.95);
  }
  75% {
    transform: translateY(-40px) translateX(20px) scale(1.05);
  }
}

/* 慢速脉冲动画 */
@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

/* 密码输入框图标颜色 */
:deep(.ant-input-password-icon),
.input-glow :deep(.ant-input-password-icon) {
  color: rgba(107, 114, 128, 0.8) !important;
}

:deep(.ant-input-password-icon:hover),
.input-glow :deep(.ant-input-password-icon:hover) {
  color: rgba(236, 72, 153, 0.8) !important;
}

/* 表单项间距 */
:deep(.ant-form-item) {
  margin-bottom: 20px;
}

/* Link 样式 */
a {
  text-decoration: none;
  transition: all 0.2s ease;
}

a:hover {
  text-decoration: underline;
}
</style>
