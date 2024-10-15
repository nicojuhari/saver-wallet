<script setup lang="ts">
    const { currentUser } = useAuth()
</script>

<template>
    <div class="container">
        Hello Home PAge

        <div v-if="currentUser">
            <pre>{{ currentUser }}</pre>

            <div>
                <nuxt-link to="/cards/new" class="btn btn-primary">Add a Card</nuxt-link>
            </div>
        </div>
        <div v-else>No user</div>


    </div>
</template>


