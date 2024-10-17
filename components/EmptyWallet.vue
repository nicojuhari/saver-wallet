<script setup lang="ts">
    
    const { isLoggedIn } = useAuth()
    
    const cardRotations = [.85, .9, .95, 1]
    const cardColors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-blue-500']

</script>

<template>
    <div class="my-10 relative h-40 flex justify-center">
        <div
            v-for="(item, idx) in cardRotations"
            :key="idx"
            class="credit-card absolute bottom-0"
            :class="cardColors[idx]"
            :style="{
                transform: `scale(${item}) translateY(${idx * 12}px)`,
            }"
        >
            <template v-if="idx==3">
                <nuxt-link v-if="!isLoggedIn" to="/cards/new" class="flex items-center justify-center relative h-full">
                    <div class="text-white flex gap-4 items-center">
                        <Icon name="i-ph-plus-light" class="text-4xl" />
                        <span class="text-xl">Add a Card</span>
                    </div>
                </nuxt-link>
                <nuxt-link v-else to="/cards" class="flex items-center justify-center relative h-full">
                    <div class="text-white flex gap-4 items-center">
                        <Icon name="i-ph-eye-light" class="text-4xl" />
                        <span class="text-xl">View your Cards</span>
                    </div>
                </nuxt-link>
            </template>
            
        </div>
    </div>
</template>

<style scoped>

</style>