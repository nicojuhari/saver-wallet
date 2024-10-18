<script setup lang="ts">
    const { user } = useAuth()
    const { getCardsByUserId, getSharedCards } = useDatabase()

    const allCards = ref()
    const cardsCount = ref(0)

    const sharedCards = ref()
    const cardsLayout = ref('slider')
    const zoomURL = ref('')

    if(user.value) {
        let res = await getCardsByUserId(user.value?.$id)

        allCards.value = res.documents
        cardsCount.value = res.total

        let res2 = await getSharedCards(user.value?.$id)
        sharedCards.value = res2.documents
    }

    const cardsLayoutStyles = computed(() => {
        if(cardsLayout.value === 'slider')
            return 'flex gap-6 overflow-x-auto snap-mandatory snap-x justify-start'
        else return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    })

    const openZoom = (cardViewURL: string) => {
        zoomURL.value = cardViewURL
    }

    const closeZoom = () => {
        zoomURL.value = ''
    }


</script>
<template>
    <div class="container">
        <div class="flex items-end gap-4 justify-between px-1.5 mb-2">
            <h1 class="text-2xl">Personal cards ({{ allCards?.length }})</h1>
            <div class="flex items-center gap-2">
                <button @click="cardsLayout='slider'" class="btn-square bg-gray-600">
                    <Icon name="i-ph-dots-three-outline-fill"/>
                </button>
                <button @click="cardsLayout='grid'" class="btn-square bg-gray-600">
                    <Icon name="i-ph-grid-nine-fill"/>
                </button>
            </div>
        </div>
        <div v-if="allCards?.length" class="gap-4 mx-auto py-2.5" :class="cardsLayoutStyles">
            <div v-for="card in allCards" :key="card.$id" 
                class="space-y-1.5 snap-center shrink-0 group relative" :class="{'mx-auto' : cardsLayout === 'grid'}">
                <img :src="card.viewUrl" class="credit-card shadow-md"/>
                <div class="text-center truncate">{{ card.title }}</div>
                <div class="group-hover:flex hidden absolute top-0 justify-center items-center h-full w-full bg-black bg-opacity-20">
                    <button @click="openZoom(card.viewUrl)" class="btn-square bg-blue-600 text-blue-600">
                        <Icon name="i-ph-magnifying-glass-plus-light"/>
                    </button>
                    <nuxt-link :to="`/cards/${card.$id}`" class="btn-square bg-green-600 text-green-600">
                        
                        <Icon name="i-ph-pencil-line-light"/>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div v-else class="text-2xl text-center my-10">
            You don't have any cards yet
        </div>

        <div class="flex items-end gap-4 justify-between px-1.5 mb-2">
            <h2 class="text-2xl">Shared cards ({{ sharedCards?.length }})</h2>
        </div>
        <div v-if="sharedCards?.length" class="gap-4 mx-auto py-2.5" :class="cardsLayoutStyles">
            <div v-for="card in sharedCards" :key="card.$id" @click="openZoom(card.viewUrl)" 
               class="space-y-1.5 snap-center shrink-0" :class="{'mx-auto' : cardsLayout === 'grid'}">
                <img :src="card.viewUrl" class="credit-card shadow-md"/>
                <div class="text-center truncate">{{ card.title }}</div>
            </div>
        </div>
        <div v-else class="text-2xl text-center my-10">
            You don't have any shared cards
        </div>

        <div v-if="zoomURL" class="fixed inset-0 z-10 bg-black bg-opacity-15">
           <img 
                :src="zoomURL" 
                class="zoom-card block w-full h-auto max-w-[460px] object-cover absolute rounded-xl aspect-[646/408] shrink-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" 
                @click="closeZoom"
            />
        </div>
    </div>
</template>