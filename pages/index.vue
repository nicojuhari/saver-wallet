<script setup lang="ts">
    const { user, isLoggedIn, checkAuth } = useAuth()
    const { getAllCards } = useDatabase()
    const cardsData = ref()

    // const fetchCards = async () => {
    //     if (user.value?.$id) {
    //         // cardsData.value = await getAllCards(user.value.$id)
    //     }
    // }

    // const cardsData = computed(async () => {
    //     if (user.value?.$id) {
    //         return await getAllCards(user.value.$id) || []
    //     }
    //     return []
    // })

    onMounted(async () => {
        await checkAuth()
        if (user.value?.$id) {
            cardsData.value = await getAllCards(user.value.$id) || []
        }
    })


</script>

<template>
    <div class="container">
        <div class="my-20 md:my-40 text-center">
            <h1 class="text-5xl md:text-7xl font-semibold">Saver Wallet</h1>
            <div class="text-lg p-6 text-gray-700 tracking-wide space-y-1.5">
                <div><span class="underline underline-offset-1 font-bold">Never forget</span> your loyalty, discount, or membership cards again.</div>
                <div>Add them online and start saving!</div>
            </div>
            <EmptyWallet :userCards="cardsData"/>
            <CardCarousel v-if="false" :cards="cardsData" />
            <div v-if="isLoggedIn" class="max-w-xs w-full mx-auto mt-10 flex flex-col gap-6">
                <nuxt-link to="/cards" class="btn btn-soft text-green-600 bg-green-600 w-full">
                    <Icon name="i-ph-eye" /> View all your cards
                </nuxt-link>
                <nuxt-link to="/cards/new" class="btn btn-soft text-blue-500 bg-blue-500 w-full">
                    <Icon name="i-ph-plus" /> Add a new card
                </nuxt-link>
            </div>
        </div>
    </div>
</template>


