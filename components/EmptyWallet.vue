<script setup lang="ts">
    
    const { isLoggedIn } = useAuth()
    
    // Reverse the order of the arrays
    const cardRotations = [1, .95, .9, .85];
    const cardColors = ['bg-blue-500', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];

</script>

<template>
    <div class="my-10 sticky h-52 flex justify-center">
        <div
            v-for="(item, idx) in cardRotations"
            :key="idx"
            class="credit-card absolute bottom-0"
            :class="[cardColors[idx], {'animate-card opacity-0':  idx != 0}]"
            :style="{
                transform: `scaleX(${item}) translateY(${idx * -10}px)`,
                animationDelay: `${(idx) * 0.15}s`,
                zIndex: -1 * idx ,
                top: `${idx * 10}px`// Adjust the delay as needed
            }"
        >
           
        <template v-if="idx == 0">
            <nuxt-link v-if="!isLoggedIn" to="/cards/new" class="flex items-center opacity-0 fade-text justify-center relative h-full shrink-0">
                <div class="text-white flex gap-4 items-center">
                    <Icon name="i-ph-plus-light" class="text-4xl" />
                    <span class="text-xl">Add a Card</span>
                </div>
            </nuxt-link>
            <nuxt-link v-else to="/cards"  class="flex items-center opacity-0 fade-text justify-center relative h-full shrink-0">
                <div class="text-white flex gap-4 items-center">
                    <Icon name="i-ph-eye-light" class="text-4xl" />
                    <span class="text-xl">View your Cards</span>
                </div>
            </nuxt-link>
        </template>
        </div>
    </div>
</template>