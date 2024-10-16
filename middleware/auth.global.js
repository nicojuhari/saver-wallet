export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoading, checkAuth } = useAuth()
  
    //don't check on these pages
    if(to.path === "/login" || to.path === "/auth") return
  
    if (isLoading.value) {
      await checkAuth()
    }
})