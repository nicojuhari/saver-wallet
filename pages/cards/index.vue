<script setup lang="ts">
    const { user } = useAuth()
    const { getCardsByUserId, getSharedCards } = useDatabase()

    const allCards = ref()
    const cardsCount = ref(0)

    const sharedCards = ref()

    if(user.value) {
        let res = await getCardsByUserId(user.value?.$id)

        allCards.value = res.documents
        cardsCount.value = res.total

        let res2 = await getSharedCards(user.value?.$id)
        sharedCards.value = res2.documents
    }

    watch(user, async () => {
        if(user.value) {
            let res = await getCardsByUserId(user.value?.$id)

            allCards.value = res.documents
            cardsCount.value = res.total

            let res2 = await getSharedCards(user.value?.$id)
            sharedCards.value = res2.documents
        }
    })



</script>
<template>
    <div class="container">
        <h1 class="page-title">Your personal cards</h1>
        <div v-if="allCards?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <nuxt-link :to="`/cards/${card.card_id}`" v-for="card in allCards" :key="card.$id" class="w-full space-y-1.5">
                <!-- <div class="text-center">{{ card.title }}</div> -->
                <img :src="card.viewUrl" class="credit-card mx-auto cursor-pointer"/>
            </nuxt-link>
        </div>
        <div v-else class="text-2xl text-center my-10">
            You don't have any cards yet
        </div>

        <h2 class="page-title pt-10">Shared with you</h2>
        <div v-if="sharedCards?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div v-for="card in sharedCards" :key="card.$id" class="w-full space-y-1.5">
                <div class="text-center">{{ card.title }}</div>
                <img :src="card.viewUrl" class="credit-card mx-auto cursor-pointer"/>
            </div>
        </div>
        <div v-else class="text-2xl text-center my-10">
            You don't have any shared cards
        </div>
    </div>
</template>