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
const { updateCard } = useDatabase()
const props = defineProps(['card'])
const open = ref(false)
const cardName = ref(props.card?.title || '')

const onUpdateCard = async () => {
     try {
        await updateCard(props.card?.$id, cardName.value)
        open.value = false
  } catch (e: any) {
    console.error('Error updating card title:', e)
  }
}


</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger class="btn btn-square btn-soft bg-green-600 text-green-600">
        <Icon name="i-ph-pencil-line-light"/>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-black bg-opacity-20 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="mb-6 text-[17px] font-semibold">
          Update card name
        </DialogTitle>
        <DialogDescription></DialogDescription>
        <input
            type="text"
            class="w-full"
            v-model="cardName"
          >
        <div class="mt-[25px] flex justify-end">
          <button
              class="btn btn-primary"
              @click="onUpdateCard()"
            >
             Update
            </button>
          
        </div>
        <DialogClose class="absolute top-6 right-6">
            <Icon name="i-ph-x" class="text-2xl"/>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>