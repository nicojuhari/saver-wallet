<script setup lang="ts">
  const { isLoggedIn } = useAuth()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <IncludesHeader/>
    <main class="min-h-dvh py-10">
      <slot></slot>
    </main>
    <LazyUiAddCardDialog v-if="isLoggedIn"/>
    <IncludesFooter class="mt-auto" />
  </div>
</template>