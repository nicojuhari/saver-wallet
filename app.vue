<script setup lang="ts">
  if(import.meta.client) {
    const { initAuth } = useAuth()
    await initAuth()
  }

</script>
<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <IncludesHeader/>
    <main>
      <NuxtPage/>
    </main>
    <IncludesFooter class="mt-auto" />
  </div>
</template>