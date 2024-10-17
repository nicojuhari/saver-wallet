<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <IncludesHeader/>
    <main class="min-h-dvh py-10">
      <slot></slot>
    </main>
    <LazyUiAddCardButton v-if="$route.path !== '/cards/new'"/>
    <IncludesFooter class="mt-auto" />
  </div>
</template>