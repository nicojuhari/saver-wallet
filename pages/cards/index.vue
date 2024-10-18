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
            return 'flex gap-4 overflow-x-auto snap-mandatory snap-x justify-start'
        else return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
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
        <div v-if="allCards?.length" class="mx-auto py-2.5" :class="cardsLayoutStyles">
            <div v-for="card in allCards" :key="card.$id" 
                class="space-y-2.5 snap-center shrink-0" :class="{'mx-auto' : cardsLayout === 'grid'}">
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
        <div v-if="sharedCards?.length" class="mx-auto py-2.5" :class="cardsLayoutStyles">
            <div v-for="card in sharedCards" :key="card.$id" @click="openZoom(card.viewUrl)" 
               class="space-y-2.5 snap-center shrink-0" :class="{'mx-auto' : cardsLayout === 'grid'}">
                <img :src="card.viewUrl" class="credit-card shadow-md"/>
                <div class="text-center truncate">{{ card.title }}</div>
            </div>
        </div>
        <div v-else class="text-2xl text-center my-10">
            You don't have any shared cards
        </div>

        
        <Transition name="fade">
            <div v-if="zoomCard" class="fixed inset-0 z-10 bg-black bg-opacity-90">
                <div class="p-4 bg-white bg-opacity-5 text-xl truncate text-white absolute top-0 left-0 w-full">{{ zoomCard.title }}</div>
                <div class="zoom-block shrink-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute w-full h-auto max-w-[460px] p-4">
                    <img :src="zoomCard.viewUrl"  class="zoom-card-active w-full object-cover rounded-xl aspesct-[646/408]" />
                </div>
                <div class="zoom-card-tools flex gap-8 justify-between py-2 px-1 items-center text-white absolute bottom-10 left-1/2 -translate-x-1/2">
                    <nuxt-link :to="`/cards/${zoomCard.card_id}`" class="btn-square bg-white shrink-0 !bg-opacity-30">
                        <Icon name="i-ph-pencil-line-light"/>
                    </nuxt-link>
                    
                    <button @click="closeZoom" class="btn-square bg-white shrink-0 !bg-opacity-30">
                        <Icon name="i-ph-x"/>
                    </button>
                </div>
            </div>
        </Transition>
       
    </div>
</template>
<style>
@media (max-width: 640px) and (orientation: portrait) {
  .zoom-card-active {
    rotate: 90deg;
    transform: translateX(-70px);
  }

  .zoom-block {
    transform: translate(-50%, calc(-50% + 70px));  
  }
}

@media (max-width: 1000px) and (orientation: landscape) {
  .zoom-card-tools {
    right: 0;
    flex-direction: column;
    width: 40px;
    left: auto;
    bottom: 20px;
  }
}
</style>