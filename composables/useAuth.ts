import { ID, Account } from "appwrite";
import type { Models } from "appwrite"

const currentUser = ref<Models.User<Models.Preferences> | null>(null)
const currentSession = ref<Models.Session | null>(null)

export default function useAuth() {

    // const currentUser = useState<Models.User<Models.Preferences> | null>('currentUser', () => null)
    // const currentSession = useState<Models.Session | null>('currentSession', () => null)
    const { client } = useAppwrite()
    const account = new Account(client)
    const router = useRouter()

    const createMagicURL = async (email: string) => {

        const token = await account?.createMagicURLToken(ID.unique(), email, 'http://localhost:3000/auth');
        return token

    }

    const getSession = async () => {
        try {
            currentSession.value = await account.getSession('current')
            currentUser.value = await account.get();
        } catch (error) {
            console.error('Failed to get session or user:', error)
            currentSession.value = null
            currentUser.value = null
        }
    }

    const createUserSession = async() => {
       
        const urlParams = new URLSearchParams(window.location.search);
        const secret = urlParams.get('secret') || '';
        const userId = urlParams.get('userId') || '';

        await account.createSession(userId, secret);
        currentUser.value = await account.get();
    }

    const initAuth = async () => {
        await getSession()
        // if (!currentUser.value) {
        //     // router.push('/login') // Redirect to login if no user
        // }
    }

    const logout = async () => {
        try {
            await account.deleteSession('current')
            currentSession.value = null
            currentUser.value = null
            router.push('/login')
        } catch (error) {
            console.error('Failed to logout:', error)
        }
    }
    



    return {
        createMagicURL,
        currentUser,
        currentSession,
        getSession,
        createUserSession,
        initAuth,
        logout,
    }

}