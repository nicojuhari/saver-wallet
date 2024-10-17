<script setup lang="ts">
    const { user, isLoggedIn } = useAuth()
    const { getAllCards } = useDatabase()
    const cardsData = ref()

const fetchCards = async () => {
  if (user.value?.$id) {
    cardsData.value = await getAllCards(user.value.$id)
  }
}

onMounted(fetchCards)


</script>

<template>
    <div class="container">
        <div class="my-20 md:my-40 text-center">
            <h1 class="text-5xl md:text-7xl font-semibold">Saver Wallet</h1>
            <div class="text-lg p-6 text-gray-700 tracking-wide space-y-1.5">
                <div><span class="underline underline-offset-1 font-bold">Never forget</span> your loyalty, discount, or membership cards again.</div>
                <div>Add them online and start saving!</div>
            </div>
            <EmptyWallet v-if="!cardsData?.length"/>
            <CardCarousel :cards="cardsData" v-if="cardsData?.length" />
            <div v-if="isLoggedIn" class="flex gap-6 justify-center mt-10">
                <nuxt-link to="/cards" class="btn btn-primary">View your cards</nuxt-link>
            </div>
        </div>
    </div>
</template>


