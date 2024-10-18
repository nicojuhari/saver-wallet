<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'

 
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

        // const fileInput = document.getElementById('') as HTMLInputElement;
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
  <DialogRoot v-model:open="open">
    <DialogTrigger class="fixed right-4 flex bottom-5 h-14 w-14 items-center bg-red-600 shadow-lg rounded-full justify-center">
        <Icon name="i-ph-plus" class="text-3xl shrink-0 text-white" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-black bg-opacity-20 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[375px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="mb-10 text-xl font-semibold">
          Add a new card
        </DialogTitle>
        <div class="space-y-6">
            <div v-if="loading"> Loading ...</div>
            <div v-if="formError" class="text-sm text-red-600">Failed to add the card!</div>
            <div v-if="formSuccess" class="text-sm text-green-600">Successfully added the card!</div>
            <div class="flex flex-col">
                <label class="font-semibold">Card name (optional):</label>
                <input type="text" v-model="cardName" class="w-full" />
            </div>
            <ImageCropper @cropped="handleCroppedImage"/>
            <div>
                <button @click="handleUpload" class="btn btn-primary w-full">Upload</button>
            </div>
        </div>
        <DialogClose class="absolute top-6 right-6">
            <Icon name="i-ph-x" class="text-2xl"/>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>