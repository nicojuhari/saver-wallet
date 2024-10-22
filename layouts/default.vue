<script setup lang="ts">
  const { isLoggedIn } = useAuth()
</script> 
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <IncludesHeader/>
    <main class="min-h-dvh py-10">
      <slot></slot>
    </main>
    <div v-if="isLoggedIn" class="container mt-auto relative">
      <nuxt-link to="/cards/new" title="Add a new card" class="btn btn-round bg-red-600 fixed md:absolute right-2 z-10 bottom-2">
              <Icon name="i-ph-plus"/>
          </nuxt-link>
    </div>
    <IncludesFooter class="mt-auto" />
  </div>
</template>