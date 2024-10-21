export default defineNuxtRouteMiddleware(async () => {
    const { isLoading, checkAuth, user } = useAuth();

    if (isLoading.value) {
        await checkAuth();
    }

    if (!user.value) {
        // Redirect to login if trying to access a protected route without authentication
        return navigateTo("/login");
    }
    
})