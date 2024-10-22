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
        <div class="flex items-center gap-4 justify-between">
            <div class="text-lg font-medium">Your cards ({{ allCards?.length }})</div>
            <div class="flex gap-4 items-center">
                <label class="flex flex-row gap-4 items-center cursor-pointer">
                    <CheckboxRoot
                        v-model:checked="editorMode"
                        class="flex h-6 w-6 appearance-none items-center justify-center rounded-md  bg-white border outline-none border-gray-600"
                    >
                        <CheckboxIndicator class="bg-gray-600 h-full w-full rounded flex items-center justify-center">
                        <Icon
                            name="i-ph-check"
                            class="text-white text-lg"
                        />
                        </CheckboxIndicator>
                    </CheckboxRoot>
                    <span class="select-none">Editor mode</span>
                </label>
            </div>
        </div>
        <template v-if="allCards?.length">
            <template v-if="!editorMode">
                <CardCarousel  :cards="allCards"/>
                <div class="flex items-center gap-3 mt-6">
                    <Icon name="i-ph-lightbulb-filament-duotone" class="text-green-600 text-2xl md:text-xl shrink-0"/>
                    <ul class="space-y-2 text-gray-500 text-sm">
                        <li>Click on a card to zoom in/out.</li>
                        <li><strong>Enable Editor Mode</strong> to update, share, or delete your card.</li>
                    </ul>
                </div>
            </template>
            <CardGrid v-else :cards="allCards" />
        </template>
        <nuxt-link to="/cards/new" v-else class="credit-card flex item justify-center items-center gap-4 bg-gray-200">

           <Icon name="i-ph-plus-light" class="text-4xl" />
                    <span class="text-xl">Add a Card</span>
        </nuxt-link>
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