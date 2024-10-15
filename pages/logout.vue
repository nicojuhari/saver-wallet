<script setup lang="ts">
    const { logout } = useAuth()
    const router = useRouter()

    logout()
    router.push('/login')

</script>
<template>
    <div>Logout</div>
</template>



