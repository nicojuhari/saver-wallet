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

defineProps(['card'])

const route = useRoute()
const router = useRouter()

const { user } = useAuth()
const { deleteCard } = useDatabase()
 const { deleteFile } = useBucket()

const onHandleDelete = async (docId: string, fileId: string) => {
        if (!user.value) {
            alert('You must be logged in to delete a card')
            return
        }

        try {
            // Delete the file from storage
            await deleteFile(fileId)
            
            // Delete the card document from the database
            await deleteCard(docId)
            
            // Show success message
           
            
            // Redirect to the cards list page
            router.push('/cards')
        } catch (err) {
            console.error('Error deleting card:', err)
            alert('An error occurred while deleting the card. Please try again.')
        }
    }
</script>

<template>
    <AlertDialogRoot>
    <div class="flex items-center justify-between border-t py-6">
        <div>Danger zone</div>
        <AlertDialogTrigger class="btn border-red-600 text-red-600 border-2">
            Delete
        </AlertDialogTrigger>
    </div>
    <AlertDialogPortal>
        <AlertDialogOverlay class="bg-black bg-opacity-5 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
        <AlertDialogContent
        class="z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
        <AlertDialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
            Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription class="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            This action cannot be undone. This will permanently delete your card and remove your data from our servers.
        </AlertDialogDescription>
        <div class="flex justify-end gap-[25px]">
            <AlertDialogCancel class="btn bg-green-600 bg-opacity-10 text-green-600"> Cancel
            </AlertDialogCancel>
            <AlertDialogAction
            class="btn bg-red-600 bg-opacity-10 text-red-600"
            @click="onHandleDelete(card.$id, card.card_id)"
            >Yes, delete
            </AlertDialogAction>
        </div>
        </AlertDialogContent>
    </AlertDialogPortal>
    </AlertDialogRoot>
</template>