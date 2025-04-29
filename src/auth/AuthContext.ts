import { createContext, useState, useContext } from 'react'
import type {
    SignInCredential,
    SignUpCredential,
    AuthResult,
    User,
    OauthSignInCallbackPayload,
} from '@/@types/auth'

type Auth = {
    authenticated: boolean
    user: User | null
    signIn: (values: SignInCredential) => Promise<AuthResult>
    signUp: (values: SignUpCredential) => Promise<AuthResult>
    signOut: () => void
    oAuthSignIn: (
        callback: (payload: OauthSignInCallbackPayload) => void,
    ) => void
}

const defaultFunctionPlaceHolder = async (): Promise<AuthResult> => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    return {
        status: '',
        message: '',
    }
}

const defaultOAuthSignInPlaceHolder = (
    callback: (payload: OauthSignInCallbackPayload) => void,
): void => {
    callback({
        onSignIn: () => {},
        redirect: () => {},
    })
}

// Create a context to hold authentication data
const AuthContext = createContext<Auth>({
    authenticated: false,
    user: null, // User data will be fetched or set later
    signIn: async () => defaultFunctionPlaceHolder(),
    signUp: async () => defaultFunctionPlaceHolder(),
    signOut: () => {},
    oAuthSignIn: defaultOAuthSignInPlaceHolder,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    // SignIn function, sets authenticated and user state
    const signIn = async (values: SignInCredential): Promise<AuthResult> => {
        // Logic for signing in (e.g., API call to verify credentials)
        // Here, we just simulate successful login
        setAuthenticated(true)
        setUser({ name: 'John Doe', email: 'johndoe@example.com' }) // Dummy user data
        return {
            status: 'success',
            message: 'Signed in successfully',
        }
    }

    // SignUp function, sets authenticated and user state
    const signUp = async (values: SignUpCredential): Promise<AuthResult> => {
        // Logic for signing up (e.g., API call to create new user)
        // Here, we just simulate successful signup
        setAuthenticated(true)
        setUser({ name: values.username, email: `${values.username}@example.com` }) // Dummy user data
        return {
            status: 'success',
            message: 'Signed up successfully',
        }
    }

    // SignOut function, resets authenticated and user state
    const signOut = () => {
        setAuthenticated(false)
        setUser(null)
    }

    // OAuth SignIn (this would typically interact with an OAuth provider)
    const oAuthSignIn = (
        callback: (payload: OauthSignInCallbackPayload) => void,
    ) => {
        callback({
            onSignIn: () => signIn({ username: 'oauthUser', password: 'password' }), // Dummy OAuth SignIn
            redirect: () => {}, // This could be a redirect to a different page
        })
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                user,
                signIn,
                signUp,
                signOut,
                oAuthSignIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): Auth => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default AuthContext
