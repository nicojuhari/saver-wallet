export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isLoading, checkAuth, user } = useAuth();

    //don't check on these pages
    if (to.path === '/' || to.path === "/login" || to.path === "/auth") return;

    if (isLoading.value) {
        await checkAuth();
    }

    // Protected routes
    const protectedRoutes = ["/cards", "/profile"];
    const isProtectedRoute = protectedRoutes.some((route) => to.path.startsWith(route));

    if (isProtectedRoute && !user.value) {
        // Redirect to login if trying to access a protected route without authentication
        return navigateTo("/login");
    }
})