<script setup lang="ts">
    const route = useRoute()
    const router = useRouter()

    const { user, isLoading } = useAuth()
    const { getCard, deleteCard } = useDatabase()
    const { deleteFile } = useBucket()
    
    const card_id: string = route.params.card_id as string
    const loading = ref(true)
    const card = ref()

    if(user.value) {
        card.value = await getCard(card_id, user.value?.$id)
        setTimeout(() => {
            loading.value = false
        }, 400)
    }

    const onHandleDelete = async (docId: string, fileId: string) => {
        if (!user.value) {
            alert('You must be logged in to delete a card')
            return
        }

        try {
            loading.value = true
            
            // Delete the file from storage
            await deleteFile(fileId)
            
            // Delete the card document from the database
            await deleteCard(docId)
            
            // Show success message
            alert('Card deleted successfully')
            
            // Redirect to the cards list page
            router.push('/cards')
        } catch (err) {
            console.error('Error deleting card:', err)
            alert('An error occurred while deleting the card. Please try again.')
        } finally {
            loading.value = false
        }
    }

    //get card, by card_id
</script>
<template>
    <div v-if="loading" class="min-h-dvh grid">
        <IncludesLoading class="w-10 m-auto"/>
    </div>
    <div v-if="!loading" class="container py-10 space-y-10">
        <img :src="card?.viewUrl"  class="credit-card mx-auto"/>
        <div class="bg-white p-6 rounded-xl space-y-6">
            <h1 class="text-semibold">Card name: {{ card?.title }}</h1>
            <div class="flex items-center justify-between border-t py-6">
                <div>Danger zone</div>
                <button class="btn border-2 border-red-600 text-red-600" @click.prevent="onHandleDelete(card.$id, card.card_id)">Delete</button>
            </div>
        </div>
    </div>
</template>

