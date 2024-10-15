<template>
    <div>{{ localUser }}</div>
</template>

<script setup lang="ts">

const { account } = useAppwrite()
const localUser = ref(null)

if (import.meta.client) {
   
    localUser.value = await account.get()
}




</script>

<style scoped></style>