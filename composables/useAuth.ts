// composables/useAuth.js
// import { ref, readonly } from 'vue'
// import { useNuxtApp } from '#app'
import { ID } from 'appwrite'
import type { Models } from 'appwrite'


const user = ref<Models.User<Models.Preferences> | null>(null)
const isLoggedIn = ref(false)
const isLoading = ref(true)

export default function useAuth() {
    
    const { $appwrite } = useNuxtApp()
    const config = useAppwriteConfig()

    const checkAuth = async () => {

        isLoading.value = true
        try {
            const response = await $appwrite.account.get()
            user.value = response
            isLoggedIn.value = true
        } catch (error) {
            console.log('User not authenticated:', error)
            user.value = null
            isLoggedIn.value = false
        } finally {
            isLoading.value = false
        }
    }

    const login = async (email: string) => {
        try {
            await $appwrite.account?.createMagicURLToken(ID.unique(), email, `${config.baseUrl}/auth`);
            return true
        } catch (error) {
        console.error('Error sending magic link:', error)
        return false
        }
    }

    const logout = async () => {
        try {
        await $appwrite.account.deleteSession('current')
        user.value = null
        isLoggedIn.value = false
        } catch (error) {
        console.error('Error logging out:', error)
        }
    }

    return {
        user: readonly(user),
        isLoggedIn: readonly(isLoggedIn),
        isLoading: readonly(isLoading),
        checkAuth,
        login,
        logout
    }
}