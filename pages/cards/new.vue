<script setup lang="ts">
    
    const { uploadFile }  = useBucket()
    const { addCard } = useDatabase()
    const { currentUser } = useAuth()
    
    const cardName = ref('')

    const handleUpload = async () => {

        const fileInput = document.getElementById('cardImage') as HTMLInputElement;
        
        try {
            if(fileInput?.files?.[0] && currentUser.value) {
                
                let result = await uploadFile(fileInput.files[0], cardName.value)
                
                if(result)
                    await addCard(result?.$id, cardName.value, currentUser?.value?.$id)
            }

        } catch(err) {
            console.log(err)
        }
        
    }

    
</script>
<template>
    <div class="container">
        <h1>Add a new card</h1>
        <div class="my-6 space-y-6 max-w-xl mx-auto bg-white rounded-md shadow-md p-6">
            <div class="flex flex-col">
                <label class="font-medium">Card name:</label>
                <input type="text" v-model="cardName" />
            </div>
            <div>
                <input type="file" id="cardImage" />
            </div>
            <div>
                <button @click="handleUpload" class="btn btn-primary">Upload</button>
            </div>
        </div>
        
        
    </div>
</template>

