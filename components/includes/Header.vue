<script setup lang="ts">
    const { currentUser } = useAuth()
</script>
<template>
    <header class="border-b">
        <div class="container flex h-14 items-center justify-between">
            <nuxt-link to="/">
                <img src="/saver-wallet-logo.svg"  title="Saver Wallet" class="h-10"/>
            </nuxt-link>
            <client-only>
                <div>
                    <nuxt-link to="/login" v-if="!currentUser">Login</nuxt-link>
                    <nuxt-link to="/logout" v-else>Logout</nuxt-link>
                </div>
            </client-only>
        </div>
    </header>
</template>



<style scoped>

</style>