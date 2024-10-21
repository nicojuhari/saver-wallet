<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'

defineProps(['card'])
const open = ref(false)
const email = ref('')

const shareCard = async (cardId: string) => {
   
    try {
        await $fetch('/api/share-card', {
            method: 'POST',
            body: { 
                email: email.value,
                fileId: cardId
            }
        })

        open.value = false
  
  } catch (e: any) {
    console.error('Error sharing file:', e)
  }
}


</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger class="btn btn-square btn-soft bg-blue-600 text-blue-600">
        <Icon name="i-ph-share-network-duotone" />
    </DialogTrigger>
    <DialogPortal>
     <DialogOverlay class="bg-black bg-opacity-20 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="m-0 text-[17px] font-semibold">
          Share Your Card
        </DialogTitle>
        <DialogDescription class="mt-[10px] mb-5 leading-normal">
          Enter the email address of the person you wish to share your card with:
        </DialogDescription>
        <input
            type="email"
            class="w-full"
            placeholder="Email address"
            v-model="email"
          >
        <DialogDescription class="my-5 leading-normal">If a user with this email exists in our system, the card will be shared instantly.</DialogDescription>
        <div class="mt-[25px] flex justify-end">
          <button
              class="btn btn-primary"
              @click="shareCard(card.card_id)"
            >
             Share Card
            </button>
          
        </div>
        <DialogClose class="absolute top-6 right-6">
            <Icon name="i-ph-x" class="text-2xl"/>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>