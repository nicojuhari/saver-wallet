<template>
    <div class="container">
        Auth
    </div>
</template>

<script setup lang="ts">
    const { createUserSession } = useAuth()
    
    if(import.meta.client) {
        await createUserSession()
    }

</script>

<style scoped>

</style>