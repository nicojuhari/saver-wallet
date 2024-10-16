<script setup lang="ts">
// ... existing imports and code ...
    const cardRotations = [15, 10, 5]
    const cardColors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500'] // Rotation degrees for background cards

</script>

<template>
    <div class="my-16 mx-auto relative w-64 h-40">
    <nuxt-link to="/cards/new" title="Add a card" class="credit-card bg-blue-500 flex items-center justify-center relative z-10">
        <Icon name="i-ph-plus-light" class="text-8xl text-white" />
    </nuxt-link>
    <!-- Background cards -->
    <div
        v-for="(rotation, idx) in cardRotations"
        :key="rotation"
        class="credit-card absolute bottom-0"
        :class="cardColors[idx]"
        :style="{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'bottom right',
        }"
    ></div>
    <!-- Main card -->
    
    </div>
</template>

<style scoped>

</style>