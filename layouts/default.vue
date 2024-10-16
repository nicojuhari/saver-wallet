<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <IncludesHeader/>
    <main class="min-h-dvh">
      <slot></slot>
    </main>
    <IncludesFooter class="mt-auto" />
  </div>
</template>