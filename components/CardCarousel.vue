<script setup lang="ts">

interface Card {
  $id: string
  viewUrl: string
  title: string
}

defineProps({
  cards: {
    default: []
  }
})

</script>

<template>
  <div class="carousel-row my-10 py-2">
    <div class="carousel-item" v-for="card in cards" :key="card.$id">
      <img :src="card.viewUrl" :alt="card.title" class="credit-card" />
    </div>
  </div>
</template>
