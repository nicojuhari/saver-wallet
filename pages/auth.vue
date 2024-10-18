<template>
    <div class="container grid place-content-center h-screen">
        <div class="text-center flex flex-col items-center">
            <IncludesLoading class="w-20 text-gray-600"/>
            <div class="pt-4">
                <p v-if="isVerifying">Verifying your login...</p>
                <p v-else-if="verificationError" class="text-red-600">{{ verificationError }}</p>
                <p v-else class="text-green-600">Verification complete. Redirecting...</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'empty'
})

const router = useRouter();
const { checkAuth } = useAuth();

const isVerifying = ref(true);
const verificationError = ref('');

const verifySession = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret') || '';
    const userId = urlParams.get('userId') || '';

  if (userId && secret) {
    try {
      const { $appwrite } = useNuxtApp();
      await $appwrite.account.updateMagicURLSession(userId, secret);
      await checkAuth(); // This will update the auth state in our composable
      isVerifying.value = false;
      router.push('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Error verifying session:', error);
      verificationError.value = 'Failed to verify your session. Please try logging in again.';
      isVerifying.value = false;
      setTimeout(() => router.push('/login'), 3000); // Redirect to login page after 3 seconds
    }
  } else {
    verificationError.value = 'Invalid verification link. Please try logging in again.';
    isVerifying.value = false;
    setTimeout(() => router.push('/login'), 3000); // Redirect to login page after 3 seconds
  }
};

onMounted(() => {
  verifySession();
});
</script>