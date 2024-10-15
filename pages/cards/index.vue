<script setup lang="ts">
    import type { Models } from 'appwrite'
    const { currentUser } = useAuth()
    const { getCardsByUserId } = useDatabase()

    const allCards = ref()
    const cardsCount = ref(0)

    if(currentUser.value) {
        let res = await getCardsByUserId(currentUser.value?.$id)

        allCards.value = res.documents
        cardsCount.value = res.total
    }

    watch(currentUser, async () => {
        if(currentUser.value) {
        let res = await getCardsByUserId(currentUser.value?.$id)

        allCards.value = res.documents
        cardsCount.value = res.total
    }
    })



</script>
<template>
    <div class="container">
        <h1>All your cards</h1>
        <div v-if="allCards?.length">
            <div v-for="card in allCards" :key="card.$id">
                {{ card.title }}
                <div>
                    <img :src="card.viewUrl" class="credit-card"/>
                </div>
            </div>
        </div>
        <div v-else>
            You don't have any cards yet
        </div>
    </div>
</template>

<style>
.credit-card {
  width: 85.60mm; /* Using actual dimensions */
  height: 53.98mm;
  max-width: 100%; /* Ensures it doesn't overflow on small screens */
  aspect-ratio: 85.60 / 53.98; /* Maintains the card's aspect ratio */
  background-color: #8d8d8d;
  border-radius: 10px;
  object-fit: cover;
  /* Other styles */
}
</style>