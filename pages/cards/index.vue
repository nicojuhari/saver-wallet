<script setup lang="ts">
    const { currentUser } = useAuth()
    const { getCardsByUserId, getSharedCards } = useDatabase()

    const allCards = ref()
    const cardsCount = ref(0)

    const sharedCards = ref()

    if(currentUser.value) {
        let res = await getCardsByUserId(currentUser.value?.$id)

        allCards.value = res.documents
        cardsCount.value = res.total

        let res2 = await getSharedCards(currentUser.value?.$id)
        sharedCards.value = res2.documents
    }

    watch(currentUser, async () => {
        if(currentUser.value) {
            let res = await getCardsByUserId(currentUser.value?.$id)

            allCards.value = res.documents
            cardsCount.value = res.total

            let res2 = await getSharedCards(currentUser.value?.$id)
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

<style>
.credit-card {
  width: 323px; /* Using actual dimensions */
  height: 204px;
  max-width: 100%; /* Ensures it doesn't overflow on small screens */
  aspect-ratio: 85.60 / 53.98; /* Maintains the card's aspect ratio */
  background-color: #8d8d8d;
  border-radius: 10px;
  object-fit: cover;
  /* Other styles */
}
</style>