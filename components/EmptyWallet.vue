<script setup lang="ts">
    
    const { isLoggedIn } = useAuth()
    const props = defineProps({
        userCards: {
            default: []
        }
    })
    
// ... existing imports and code ...
    const cardRotations = [12, 8, 4, 0]
    const cardColors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-blue-500'] // Rotation degrees for background cards

    // Ensure userCards has exactly 4 items
    const adjustedUserCards = computed(() => {
        const maxCards = 4
        const cards = props.userCards.slice(0, maxCards) // Truncate to 4 if more
        while (cards.length < maxCards) {
            cards.push({}) // Add empty cards if less
        }
        return cards.reverse()
    })


</script>

<template>
    <div class="mt-20 mb-10 relative h-56 flex justify-center">
    <div
        v-for="(card, idx) in adjustedUserCards"
        :key="idx"
        class="credit-card absolute bottom-0"
        :class="cardColors[idx]"
        :style="{
            transform: `rotate(${cardRotations[idx]}deg)`,
            transformOrigin: 'bottom right',
        }"
    >
        <img :src="card.viewUrl" />
        <nuxt-link v-if="idx === 3 && !card?.viewUrl" to="/cards/new" class="flex items-center justify-center relative h-full">
            <div class="text-white flex gap-4 items-center">
                <Icon name="i-ph-plus-light" class="text-4xl" />
                <span>Add a Card</span>
            </div>
        </nuxt-link>
        

    </div>
    <!-- Main card -->
    
    </div>
</template>

<style scoped>

</style>