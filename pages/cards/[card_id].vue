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
    <div v-if="!loading && card" class="container py-10 space-y-10">
        <img :src="card?.viewUrl"  class="credit-card mx-auto"/>
        <div class="bg-white p-6 rounded-xl">
            <h1 class="text-semibold py-6">Card name: {{ card?.title }}</h1>
            <UiShareCard :card="card"/>
            <UiDeleteCard :card="card" />
        </div>
    </div>
</template>

