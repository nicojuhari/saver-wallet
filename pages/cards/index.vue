<script setup lang="ts">
    import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'
    const { user } = useAuth()
    const { getCardsByUserId, getSharedCards } = useDatabase()

    const allCards = ref()
    const cardsCount = ref(0)

    const sharedCards = ref()

    if(user.value) {
        let res = await getCardsByUserId(user.value?.$id)

        allCards.value = res.documents
        cardsCount.value = res.total

        let res2 = await getSharedCards(user.value?.$id)
        sharedCards.value = res2.documents
    }

    const editorMode = ref(false)


</script>
<template>
    <div class="container">
        <div class="flex items-center gap-4 justify-between px-1.5 mb-2">
            <div>
                <div class="text-lg font-medium"> Your cards ({{ allCards?.length }})</div>
                <div class="text-sm text-gray-600">click on card to zoom in/out</div>
            </div>
            <div>
                <label class="flex flex-row gap-4 items-center cursor-pointer">
                <CheckboxRoot
                    v-model:checked="editorMode"
                    class="flex h-6 w-6 appearance-none items-center justify-center rounded-md  bg-white shadow-md outline-none focus-within:shadow-xl"
                >
                    <CheckboxIndicator class="bg-white h-full w-full rounded flex items-center justify-center">
                    <Icon
                        name="i-ph-check"
                        class="text-blue-600 text-lg"
                    />
                    </CheckboxIndicator>
                </CheckboxRoot>
                <span class="select-none">Editor mode?</span>
                </label>
            </div>
        </div>
        <template v-if="allCards?.length">
            <CardCarousel v-if="!editorMode" :cards="allCards"/>
            <CardGrid v-else :cards="allCards" />
        </template>
        <div v-else class="text-2xl text-center my-10">
            You don't have any cards yet
        </div>
        
        <!-- SHARED CARDS -->
        <div class="mt-16 mb-2">
            <div class="text-lg font-medium"> Shared with you ({{ sharedCards?.length }})</div>
            <div class="text-sm text-gray-600">click on card to zoom in/out</div>
        </div>
        <template v-if="sharedCards?.length">
             <CardCarousel v-if="!editorMode" :cards="sharedCards"/>
        </template>
        <div v-else class="text-2xl text-center my-10">
            You don't have any shared cards
        </div>
    </div>
</template>
<!-- <style>
@media (max-width: 640px) and (orientation: portrait) {
  .zoom-card-active {
    rotate: 90deg;
    transform: translateX(-70px);
  }

  .zoom-block {
    transform: translate(-50%, calc(-50% + 70px));  
  }
}

@media (max-width: 1000px) and (orientation: landscape) {
  .zoom-card-tools {
    right: 0px;
    flex-direction: column;
    width: 40px;
    left: auto;
    top: 50%;
    bottom: auto;
    --tw-translate-y: -50%;
  }
}
</style> -->