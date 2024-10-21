<script setup lang="ts">
    
    definePageMeta({ middleware: "auth"})

    const { uploadFile }  = useBucket()
    const { addCard } = useDatabase()
    const { user } = useAuth()
    const router = useRouter()
    
    const open = ref(false)
    const cardName = ref('')
    const loading = ref(false)
    const formSuccess = ref(false)
    const formError = ref(false)

    const croppedImage = ref<File | null>(null);

    const handleCroppedImage = (imageUrl: File) => {
        croppedImage.value = imageUrl;
    };    

    const handleUpload = async () => {

        loading.value = true
        formError.value = false
        formSuccess.value = false
        
        try {

            if(croppedImage.value && user.value) {
                
                let result = await uploadFile(croppedImage?.value)
                
                if(result)
                    await addCard(result?.$id, cardName.value, user?.value?.$id)

                formSuccess.value = true

                setTimeout(() => {
                    open.value = false
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
        <div class="space-y-6 max-w-[375px] p-6 rounded-lg bg-white shadow-lg mx-auto">
            <h1 class="text-2xl text-center">Add a new card</h1>
            <div v-if="loading"> Loading ...</div>
            <div v-if="formError" class="text-sm text-red-600">Failed to add the card!</div>
            <div v-if="formSuccess" class="text-sm text-green-600">Successfully added the card!</div>
            <div class="flex flex-col">
                <label class="font-medium">Card name (optional):</label>
                <input type="text" v-model="cardName" class="w-full" />
            </div>
            <ImageCropper @cropped="handleCroppedImage"/>
            <div>
                <button @click="handleUpload" :disabled="!croppedImage" class="btn btn-primary w-full">Upload</button>
            </div>
        </div>
    </div>
</template>


