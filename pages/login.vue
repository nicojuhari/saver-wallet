<script setup lang="ts">
    const { login } = useAuth()
    
    const userEmail = ref('')
    const linkSent = ref(false)
    const emailError = ref('')

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }  

    const sendMagicLink = async () => {
        emailError.value = ''

        if (!userEmail.value) {
            emailError.value = 'Please enter your email address.'
            return
        }

        if (!validateEmail(userEmail.value)) {
            emailError.value = 'Please enter a valid email address.'
            return
        }

        const success = await login(userEmail.value)
        if (success) {
            userEmail.value = ''
            linkSent.value = true
        } else {
           emailError.value = 'Failed to send magic link. Please try again.'
        }
    }
</script>
<template>
    <div class="flex min-h-[calc(100dvh-56px)] p-4">
        <div class="m-auto bg-white shadow-md rounded-md space-y-6 p-6 w-full max-w-sm">
            <div class="font-bold text-center text-xl">Welcome to Saver Wallet</div>
            <p class="text-sm">Log in securely with just your email.<br><br>We'll send you a magic link to access your account, no password required!</p>
            <div class="flex flex-col">
                <label>Email</label>
                <input type="email" v-model="userEmail"  :class="{'border-red-500': emailError}">
                <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
            </div>
            <button class="btn w-full btn-primary" @click="sendMagicLink">
                Send Magic Link
            </button>
            <p class="text-green-600" v-if="linkSent">
                Magic link sent!<br>Please check your email and click the link to log in.
            </p>
        </div>
    </div>
</template>