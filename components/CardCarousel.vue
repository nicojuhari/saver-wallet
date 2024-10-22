<script setup>
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/style.css';

defineProps({
  cards: {
    default: []
  }
})




onMounted(() => {

  const lightbox = new PhotoSwipeLightbox({
    gallery: '#card-carousel',
    children: 'a',
    arrowPrev: false,
    arrowNext: false,
    loop: false,
    pswpModule: PhotoSwipe
  });

  lightbox.init();
})





</script>

<template>
  <div class="carousel-row py-4" id="card-carousel">
    <a 
      v-for="card in cards" 
      :key="card.$id" 
      :href="card.viewUrl" 
      :data-pswp-width="485" 
      :data-pswp-height="306"
      class="shrink-0 credit-card"
      :title="card?.title"
    >
      <img 
        :src="card.viewUrl" 
        :alt="card.title" 
        class="shrink-0"
      />
    </a>
  </div>
</template>
<style>
 .pswp__img {
    aspect-ratio: 323 / 204;
    border-radius: 20px;
 }
</style>
