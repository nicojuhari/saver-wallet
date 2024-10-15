<script setup lang="ts">
    import type { Models } from 'appwrite'
    const { currentUser } = useAuth()
    const { getFilesWithViewUrls } = useBucket()

    const allCards = ref<(Models.File & {
        viewUrl: string;
    })[]>([])

    if(currentUser.value) {
        allCards.value = await getFilesWithViewUrls(currentUser.value?.$id)
    }


</script>
<template>
    <div class="container">
        <h1>All your cards</h1>
        <div v-if="allCards?.length">
            <div v-for="card in allCards" :key="card.$id">
                {{ card.name }}
                <div>
                    <img :src="card.viewUrl" class="credit-card"/>
                </div>
            </div>
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