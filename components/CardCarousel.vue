<script setup>

defineProps({
  cards: {
    default: []
  }
})

const viewCard = (url) => {
  console.log(url)

}



</script>

<template>
  <div class="carousel-row my-10 py-2">
    <div class="carousel-item cursor-pointer" v-for="card in cards" :key="card.$id" @click="viewCard(card.viewUrl)">
      <img :src="card.viewUrl" :alt="card.title" class="credit-card" />
    </div>
  </div>
</template>
