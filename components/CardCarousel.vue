<script setup lang="ts">
interface Card {
  id: string;
  title: string;
  image: string;
}

const props = defineProps<{
  cards: Card[];
}>();

const brandColor = ['border-blue-600', 'border-red-600', 'border-yellow-600', 'border-green-600']
const textColor = ['text-blue-600', 'text-red-600', 'text-yellow-600', 'text-green-600']

</script>

<template>
  <div class="carousel-row my-10 py-2">
      <template v-if="cards.length">
        <div class="carousel-item" v-for="card in cards" :key="card.id">
            <img :src="card.image" :alt="card.title" class="credit-card" />
            <h2 class="absolute left-2 bottom-2 ">{{ card.title }}</h2>
        </div>
      </template>
      <template v-else>
         <div class="carousel-item" v-for="(color, idx) in brandColor" :key="color">
            <div class="credit-card border-2 !bg-transparent grid place-content-center" :class="`${color}`">
              <span class="text-5xl font-bold" :color="textColor[idx]">Your Card</span>
            </div>
        </div>
      </template>
  </div>
</template>
