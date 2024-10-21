<script setup lang="ts">
    definePageMeta({ middleware: "auth"})
    const { user } = useAuth()
</script>

<template>
    <div class="container p-6 space-y-6 bg-white my-10">
       <div>Email: {{ user?.email }}</div>
       <div>ID: {{ user?.$id }}</div>
       <nuxt-link to="/logout" class="btn btn-primary">Logout</nuxt-link>
    </div>
</template>


