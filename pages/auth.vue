<template>
    <div class="container grid place-content-center min-h-dvh">
        <div class="text-center flex flex-col items-center">
            <IncludesLoading class="w-20 text-gray-600"/>
            <div class="pt-4">Authorization...</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { createUserSession } = useAuth()
    
    if(import.meta.client) {
        await createUserSession()

        setTimeout(() => {
            useRouter().push('/')
        }, 400)
    }

</script>

<style scoped>

</style>