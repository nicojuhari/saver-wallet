<script setup lang="ts">
    import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'

    definePageMeta({ middleware: "auth"})

    const { user } = useAuth()
    const { getAllCards } = useDatabase()

    const allCards = ref()

    if(user.value?.$id) {
         allCards.value = await getAllCards(user.value?.$id)
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
            <div class="flex gap-4 items-center">
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
                 <nuxt-link to="/cards/new" title="Add a new card" class="shrink-0 h-10">
                    <Icon name="i-ph-plus-circle-thin" class="text-[40px] text-red-600"/>
                </nuxt-link>
            </div>
        </div>
        <template v-if="allCards?.length">
            <CardCarousel v-if="!editorMode" :cards="allCards"/>
            <CardGrid v-else :cards="allCards" />
        </template>
        <div v-else class="text-2xl text-center my-10">
            You don't have any cards yet <nuxt-link to="/cards/new" title="Add a new card" class="shrink-0 h-10">
                    <Icon name="i-ph-plus-circle-thin" class="text-[40px] text-red-600"/>
                </nuxt-link>
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