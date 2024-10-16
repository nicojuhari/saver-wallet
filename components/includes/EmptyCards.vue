<template>
  <div class="carousel-container">
    <div class="carousel" ref="carousel">
      <div class="credit-card" v-for="i in 3" :key="i"></div>
    </div>
    <button class="carousel-button prev" @click="moveCarousel(-1)">&lt;</button>
    <button class="carousel-button next" @click="moveCarousel(1)">&gt;</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const carousel = ref<HTMLElement | null>(null);
let currentIndex = 0;

const moveCarousel = (direction: number) => {
  if (carousel.value) {
    const cards = carousel.value.children;
    currentIndex = (currentIndex + direction + cards.length) % cards.length;
    updateCarousel();
  }
};

const updateCarousel = () => {
  if (carousel.value) {
    const offset = -currentIndex * 100;
    carousel.value.style.transform = `translateX(${offset}%)`;
  }
};

onMounted(() => {
  updateCarousel();
});
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 323px;
  height: 204px;
  overflow: hidden;
  margin: 0 auto;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
}

.credit-card {
  width: 323px;
  height: 204px;
  flex-shrink: 0;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
}

.carousel-button.prev {
  left: 10px;
}

.carousel-button.next {
  right: 10px;
}
</style>