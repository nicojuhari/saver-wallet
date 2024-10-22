<script setup lang="ts">

</script>

<template>
    <div class="container">
        <div class="my-20 md:my-30 text-center">
            <h1 class="text-5xl md:text-7xl font-semibold">Saver Wallet</h1>
            <div class="text-lg md:text-xl py-6 text-gray-900 tracking-wide space-y-2.5">
                <div><span class="font-bold">Never forget</span> your loyalty, discount, or membership cards again.</div>
                <div>Add them online!</div>
            </div>
            <EmptyWallet class="mt-20"/>
            <div class="inline-flex items-center gap-3 mt-12 px-2 text-left">
                <Icon name="i-ph-lightbulb-filament-duotone" class="text-green-600 text-2xl md:text-xl shrink-0"/>
                <span class="text-sm text-gray-500">Add your cards online, share them with friends and family, and save more together.</span>
            </div>
        </div>
        <LazyIncludesHomePageContent />
    </div>
</template>


