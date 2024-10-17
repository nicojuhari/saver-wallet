<script setup>

defineProps({
  cards: {
    default: []
  }
})

const selectedCard = ref(null);

const viewCard = (card) => {
  selectedCard.value = card;
};

const closeModal = () => {
  selectedCard.value = null;
};



</script>

<template>
  <div class="carousel-row my-10 py-2">
    <div class="carousel-item cursor-pointer" v-for="card in cards" :key="card.$id" @click="viewCard(card)">
      <img :src="card.viewUrl" :alt="card.title" class="credit-card" />
    </div>
  </div>
   <div v-if="selectedCard" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
    <div class="bg-white max-w-full max-h-full overflow-auto p-4" style="max-width: 600px;">
      <img :src="selectedCard.viewUrl" :alt="selectedCard.title" class="credit-card" />
      <button @click="closeModal" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Close</button>
    </div>
  </div>
</template>
