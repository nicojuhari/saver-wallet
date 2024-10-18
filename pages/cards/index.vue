<script setup lang="ts">
    const { user } = useAuth()
    const { getCardsByUserId, getSharedCards } = useDatabase()

    const allCards = ref()
    const cardsCount = ref(0)

    const sharedCards = ref()
    const cardsLayout = ref('slider')
    const zoomCard = ref()

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

    const openZoom = (card:any) => {
        zoomCard.value = card
    }

    const closeZoom = () => {
        zoomCard.value = null
    }


</script>
<template>
    <div class="container">
        <div class="flex items-center gap-4 justify-between px-1.5 mb-2">
            <div>
                <div class="text-lg font-medium"> Your cards ({{ allCards?.length }})</div>
                <div class="text-sm text-gray-600">click on card to zoom in/out</div>
            </div>
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
                class="space-y-2.5 snap-center shrink-0 group relative" :class="{'mx-auto' : cardsLayout === 'grid'}">
                <img :src="card.viewUrl" class="credit-card shadow-md" @click="openZoom(card)"/>
            </div>
        </div>
        <div v-else class="text-2xl text-center my-10">
            You don't have any cards yet
        </div>

        <div class="mt-16">
            <div class="text-lg font-medium"> Shared with yo ({{ sharedCards?.length }})</div>
            <div class="text-sm text-gray-600">click on card to zoom it</div>
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

        
        <Transition name="fade">
            <div v-if="zoomCard" class="fixed inset-0 z-10 bg-black bg-opacity-90 " @click="closeZoom">
                <div class="shrink-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute w-full h-auto max-w-[460px] p-4">
                    <img :src="zoomCard.viewUrl"  class="zoom-card block w-full object-cover rounded-xl aspect-[646/408]" />
                    <div class="flex gap-6 justify-between py-2 px-1 items-center text-white">
                        <nuxt-link :to="`/cards/${zoomCard.card_id}`" class="btn-square bg-white">
                            <Icon name="i-ph-pencil-line-light"/>
                        </nuxt-link>
                        <div class="text-center truncate text-white">{{ zoomCard.title }}</div>
                        <button @click="closeZoom" class="btn-square bg-white">
                            <Icon name="i-ph-x"/>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
       
    </div>
</template>