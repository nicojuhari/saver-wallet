<script setup lang="ts">
interface Card {
  id: number;
  title: string;
  image: string;
}

defineProps<{
  cards: Card[];
}>();



</script>

<template>
  <div class="carousel-row my-10 py-2">
      <div class="carousel-item" v-for="card in cards" :key="card.id">
          <img :src="card.image" :alt="card.title" class="credit-card" />
          <h2 class="absolute left-2 bottom-2 ">{{ card.title }}</h2>
      </div>
  </div>
</template>
