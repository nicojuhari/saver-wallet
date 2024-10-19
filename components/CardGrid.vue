<script setup>
    defineProps({
        cards: {
        default: []
        }
    })
</script>

<template>
    <div class="mx-auto py-2.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <nuxt-link :to="`/cards/${card.card_id}`" v-for="card in cards" :key="card.$id" 
            class="shrink-0 mx-auto">
            <img :src="card.viewUrl" class="credit-card shadow-md"/>
            <div class="flex gap-4 items-center justify-center py-2.5">
                <button class="btn btn-square btn-soft bg-blue-600 text-blue-600">
                    <Icon name="i-ph-share-network-duotone" />
                </button>
                <span>or</span>
                <button class="btn btn-square btn-soft bg-green-600 text-green-600">
                        <Icon name="i-ph-pencil-line-light"/>
                    </button>
            </div>
        </nuxt-link>
    </div>
</template>