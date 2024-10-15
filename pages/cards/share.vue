<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const fileId = ref('670e39570022c59a44be')
const message = ref('')
const error = ref('')

const shareFile = async () => {
  try {
    const response: { message: string } = await $fetch('/api/share-card', {
      method: 'POST',
      body: { 
        email: email.value,
        fileId: fileId.value
      }
    })
    message.value = response?.message
    error.value = ''
  } catch (e: any) {
    console.error('Error sharing file:', e)
    message.value = ''
    error.value = e?.statusMessage || 'Failed to share file'
  }
}
</script>

<template>
  <input v-model="email" placeholder="Enter recipient's email">
  <input v-model="fileId" placeholder="Enter file ID">
  <button @click="shareFile">Share File</button>
  <p v-if="message" class="success">{{ message }}</p>
  <p v-if="error" class="error">{{ error }}</p>
</template>