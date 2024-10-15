<script setup lang="ts">
    
    const { uploadFile }  = useBucket()
    const { addCard } = useDatabase()
    const { currentUser } = useAuth()
    const router = useRouter()
    
    
    const cardName = ref('')
    const loading = ref(false)
    const formSuccess = ref(false)
    const formError = ref(false)
    

    const handleUpload = async () => {

        const fileInput = document.getElementById('cardImage') as HTMLInputElement;
        loading.value = true
        formError.value = false
        formSuccess.value = false
        
        try {

            if(fileInput?.files?.[0] && currentUser.value) {
                
                let result = await uploadFile(fileInput.files[0])
                
                if(result)
                    await addCard(result?.$id, cardName.value, currentUser?.value?.$id)

                formSuccess.value = true

                setTimeout(() => {
                    router.push('/cards')
                }, 800)
                
            }

        } catch(err) {
            console.log(err)
            formError.value = true

            setTimeout(()=> {
                formError.value = false
            }, 800)
        } finally {
            setTimeout(()=> {
                loading.value = false
            }, 400)
        }
        
    }

    
</script>
<template>
    <div class="container">
        
        <div class="my-6 space-y-6 max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 class="text-center text-semibold text-xl mt-4">Add a new card</h1>
            <div v-if="loading"> Loading ...</div>
            <div v-if="formError" class="text-sm text-red-600">Failed to add the card!</div>
            <div v-if="formSuccess" class="text-sm text-green-600">Successfully added the card!</div>
            <div class="flex flex-col">
                <label class="font-medium">Card name:</label>
                <input type="text" v-model="cardName" class="w-full" />
            </div>
            <div>
                <input type="file" id="cardImage" class="w-full" />
            </div>
            <div>
                <button @click="handleUpload" class="btn btn-primary">Upload</button>
            </div>
        </div>
        
        
    </div>
</template>

