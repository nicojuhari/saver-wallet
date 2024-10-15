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
                    <nuxt-link to="/logout" v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a100 100 0 1 0-167.3 73.9a3.6 3.6 0 0 0 .9.8a99.9 99.9 0 0 0 132.9 0l.8-.8A99.6 99.6 0 0 0 228 128Zm-192 0a92 92 0 1 1 157.2 64.9a75.8 75.8 0 0 0-44.5-34.1a44 44 0 1 0-41.4 0a75.8 75.8 0 0 0-44.5 34.1A92.1 92.1 0 0 1 36 128Zm92 28a36 36 0 1 1 36-36a36 36 0 0 1-36 36Zm-59.1 42.4a68 68 0 0 1 118.2 0a91.7 91.7 0 0 1-118.2 0Z"/></svg>
                    </nuxt-link>
                </div>
            </client-only>
        </div>
    </header>
</template>



<style scoped>

</style>