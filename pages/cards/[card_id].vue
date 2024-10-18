<script setup lang="ts">

    const route = useRoute()
    const { user } = useAuth()
    const { getCard } = useDatabase()
    
    const card_id: string = route.params.card_id as string
    const loading = ref(true)
    const card = ref()

    if(user.value) {
        card.value = await getCard(card_id, user.value?.$id)
        setTimeout(() => {
            loading.value = false
        }, 400)
    }

     



    //get card, by card_id
</script>
<template>
    <div v-if="loading" class="min-h-dvh grid">
        <IncludesLoading class="w-10 m-auto"/>
    </div>
    <div v-else-if="card" class="max-w-[371px] w-full mx-auto space-y-10">
        <div class="bg-white p-6 rounded-lg shadow">
            <img :src="card?.viewUrl"  class="credit-card mx-auto"/>
            <h1 class="text-lg font-bold py-6">{{ card?.title }}</h1>
            <UiShareCard :card="card"/>
            <UiDeleteCard :card="card" />
            <div class="border-t">
                <nuxt-link to="/cards" class="btn btn-primary w-full mt-6">View all cards</nuxt-link>
            </div>
        </div>
    </div>
</template>

