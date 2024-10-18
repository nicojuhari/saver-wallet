<script setup lang="ts">
    definePageMeta({
        layout: 'empty'
    })

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
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <nuxt-link to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img class="h-10" src="/saver-wallet-logo.svg" alt="Saver Wallet">    
        </nuxt-link>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x">
                  Welcome to Saver Wallet
                </h1>
                <p>Log in securely with your email. We'll send you a magic link to access your account—no password needed!</p>
                <div class="space-y-4 md:space-y-6">
                    <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" v-model="userEmail" class="w-full"  :class="{'border-red-500': emailError}">
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
      </div>
  </div>
</template>