<script setup lang="ts">
    const signUp = ref(false)

    const { createMagicURL } = useAuth()

    const formData = reactive({
        email: '',
    })

    const formErrors = reactive({
        email: '',
        password: ''
    })

    const handleForm = async () => {
        let response = await createMagicURL(formData.email)
        console.log(response)
    }
</script>
<template>
    <div class="flex min-h-screen p-4">
        <div class="m-auto bg-white shadow-md rounded-md p-6 w-full max-w-sm">
            <div class="font-bold mb-6 text-center">{{ signUp ? 'Register' : 'Log in' }}</div>
            <!-- <div v-if="loginMessage.message" class="text-sm mb-4 duration-300"
                :class="loginMessage.success ? 'text-green-600' : 'text-red-600'">
                {{ loginMessage.message }}
            </div> -->
            <div class="flex flex-col mb-6">
                <label>Email</label>
                <input type="email" v-model="formData.email" class="border border-gray-400 rounded-md p-2">
                <div class="text-sm text-red-700" v-if="formErrors.email"> {{ formErrors.email }}</div>
            </div>
            <!-- <div class="flex flex-col mb-6">
                <label>Password</label>
                <input type="password" v-model="formData.password" class="border border-gray-400 rounded-md p-2">
                <div class="text-sm text-red-700" v-if="formErrors.password"> {{ formErrors.password }}</div>
            </div> -->
            <!-- <div v-if="!signUp" class="text-sm mb-6 -mt-4">I have forgotten my <RouterLink to="/password-recovery"
                    class="text-blue-600 ">password.</RouterLink>
            </div> -->
            <button class="btn w-full btn-primary" @click="handleForm">
                Login
            </button>
            
            <!-- <div class="text-center w-full mt-8">
                <a @click.prevent="toggleForm" class="cursor-pointer">
                    <span v-if="signUp">Already have an account? <b class="text-blue-600">Log in</b></span>
                    <span v-else>No account yet? <b class="text-blue-600">Register</b></span>
                </a>
            </div> -->
        </div>
    </div>
</template>
<style>
.divider:before {
    content: '';
    display: block;
    height: 1px;
    background: #000;
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 0;
    border-bottom: 1px solid #eaeaea;
    width: 100%;
    margin: 0 auto;
}
</style>