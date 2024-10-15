<template>
    <div class="container">
        Auth
    </div>
</template>

<script setup lang="ts">
    const { account } = useAppwrite()
    
    if(import.meta.client) {
        const { currentUser } = useAuth()

        const urlParams = new URLSearchParams(window.location.search);
        const secret = urlParams.get('secret') || '';
        const userId = urlParams.get('userId') || '';

        const user = await account.createSession(userId, secret);
    }

</script>

<style scoped>

</style>