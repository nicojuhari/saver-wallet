<script setup lang="ts">
    const { currentUser } = useAuth()

    const cardsData = [
    { id: 1, title: 'Card 1', image: 'https://images.pexels.com/photos/1111369/pexels-photo-1111369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 2, title: 'Card 2', image: 'https://images.pexels.com/photos/1111369/pexels-photo-1111369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 3, title: 'Card 3', image: 'https://images.pexels.com/photos/1111369/pexels-photo-1111369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 4, title: 'Card 4', image: 'https://images.pexels.com/photos/1111369/pexels-photo-1111369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 5, title: 'Card 5', image: 'https://images.pexels.com/photos/1111369/pexels-photo-1111369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    // Add more cards as needed
    ];
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
            <div v-if="currentUser" class="flex gap-6 justify-center mt-10">
                <nuxt-link to="/cards/new" class="btn btn-primary">Add a Card</nuxt-link>
                <nuxt-link to="/cards" class="btn btn-primary">View your cards</nuxt-link>
            </div>
            <div v-else>
                Login
            </div>
        </div>
    </div>
</template>


