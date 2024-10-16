<template>
    <div class="container p-6 space-y-6">
       <div>Your Email: {{ user?.email }}</div>
       <nuxt-link to="/logout" class="btn btn-primary">Logout</nuxt-link>
    </div>
</template>

<script setup lang="ts">
    const { user } = useAuth()


</script>
