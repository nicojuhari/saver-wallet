<script setup lang="ts">
    const { currentUser } = useAuth()
</script>

<template>
    <div class="container">
        <div class="my-20 md:my-40 text-center">
            <h1 class="text-3xl md:text-6xl font-bold">Saver Wallet</h1>
            <div class="text-xl mt-6 text-gray-700">
                <div>Never forget your loyalty, discount or membership card again!</div>
                <div>Add them online and start saving toady.</div>
            </div>
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


