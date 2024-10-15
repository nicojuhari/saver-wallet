<script setup lang="ts">
    const { currentUser } = useAuth()
</script>
<template>
    <header>
        <div class="container flex h-10 items-center justify-between">
            <nuxt-link to="/">Logo</nuxt-link>
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