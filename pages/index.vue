<script setup lang="ts">
    const { user } = useAuth()

    type Card = {
        id: string,
        title: string,
        image: string
    }

    const cardsData: Card[] = [];
</script>

<template>
    <div class="container">
        <div class="my-20 md:my-40 text-center">
            <h1 class="text-3xl md:text-6xl font-bold">Saver Wallet</h1>
            <div class="text-lg p-6 text-gray-700 tracking-wide space-y-1.5">
                <div><span class="underline underline-offset-1 font-bold">Never forget</span> your loyalty, discount, or membership cards again.</div>
                <div>Add them online and start saving!</div>
            </div>
            <CardCarousel :cards="cardsData" />
            <div v-if="user" class="flex gap-6 justify-center mt-10">
                <nuxt-link to="/cards/new" class="btn btn-primary">Add a Card</nuxt-link>
                <nuxt-link to="/cards" class="btn btn-primary">View your cards</nuxt-link>
            </div>
        </div>
    </div>
</template>


