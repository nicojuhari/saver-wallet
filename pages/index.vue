<script setup lang="ts">
    const { user, checkAuth } = useAuth()
    const { getAllCards } = useDatabase()
    const cardsData = ref()

    onMounted(async () => {
        await checkAuth()
        if (user.value?.$id) {
            cardsData.value = await getAllCards(user.value.$id) || []
        }
    })


</script>

<template>
    <div class="container">
        <div class="my-20 md:my-30 text-center">
            <h1 class="text-5xl md:text-7xl font-semibold">Saver Wallet</h1>
            <div class="text-lg md:text-xl py-6 text-gray-700 tracking-wide space-y-2.5">
                <div><span class="underline underline-offset-1 font-bold">Never forget</span> your loyalty, discount, or membership cards again.</div>
                <div>Add your cards online, share them with friends and family, <span class="underline underline-offset-1 font-bold">and save more together!</span></div>
            </div>
            <EmptyWallet :userCards="cardsData"/>
        </div>
    </div>
</template>


