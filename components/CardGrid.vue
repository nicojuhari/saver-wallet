<script setup>
    defineProps({
        cards: {
        default: []
        }
    })
</script>

<template>
    <div class="divide-y-2">
        <div v-for="card in cards" :key="card.$id" 
            class="py-6 flex flex-col md:flex-row justify-between items-center">
            <div>
                <img :src="card.viewUrl" class="credit-card shadow-md mx-auto md:mx-0"/>
            </div>
            <div> {{  card.title }}</div>
            <div class="flex gap-6 items-center justify-center mt-6" v-if="!card.isShared">
                <UiDeleteCard :card="card" />
                <UiUpdateCard :card="card"/>
                <UiShareCard :card="card"/>
            </div>
            <div v-else class="flex items-center justify-center">
                This card is shared with you
            </div>
        </div>
    </div>
</template>