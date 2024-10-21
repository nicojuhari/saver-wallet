<script setup lang="ts">
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'radix-vue'

const props = defineProps(['card'])

const { user } = useAuth()
const { deleteCard } = useDatabase()
 const { deleteFile } = useBucket()

const onHandleDelete = async (docId: string, fileId: string) => {
        if (!user.value) {
            alert('You must be logged in to delete a card')
            return
        }

        if(user.value.$id !== props.card?.user_id) {
            alert('You can\'t delete the card, because you are not the owner of it.')
            return
        }

        try {
            // Delete the file from storage
            await deleteFile(fileId)
            
            // Delete the card document from the database
            await deleteCard(docId)
            
            // Show success message ???
           
            // Redirect to the cards list page
            window.location.reload()
        } catch (err) {
            console.error('Error deleting card:', err)
            alert('An error occurred while deleting the card. Please try again.')
        }
    }
</script>

<template>
    <AlertDialogRoot>
     <AlertDialogTrigger class="btn btn-square btn-soft bg-red-600 text-red-600">
        <Icon name="i-ph-trash-duotone" />
    </AlertDialogTrigger>
    <AlertDialogPortal>
        <AlertDialogOverlay class="bg-black bg-opacity-5 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
        <AlertDialogContent
        class="z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
        <AlertDialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
            Are you sure you want to proceed?
        </AlertDialogTitle>
        <AlertDialogDescription class="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            This action cannot be undone and will permanently delete your card.
        </AlertDialogDescription>
        <div class="flex justify-end gap-[25px]">
            <AlertDialogCancel class="btn bg-green-600 bg-opacity-10 text-green-600"> Cancel
            </AlertDialogCancel>
            <AlertDialogAction
            class="btn bg-red-600 bg-opacity-10 text-red-600"
            @click="onHandleDelete(card.$id, card.card_id)"
            >Yes, delete it
            </AlertDialogAction>
        </div>
        </AlertDialogContent>
    </AlertDialogPortal>
    </AlertDialogRoot>
</template>