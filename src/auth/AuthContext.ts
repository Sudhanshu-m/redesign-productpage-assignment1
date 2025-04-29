import { createContext, useState, useContext, ReactNode } from 'react';
import type {
    SignInCredential,
    SignUpCredential,
    AuthResult,
    User,
    OauthSignInCallbackPayload,
} from '@/@types/auth';

// Define the Auth context type
type Auth = {
    authenticated: boolean;
    user: User | null;
    signIn: (values: SignInCredential) => Promise<AuthResult>;
    signUp: (values: SignUpCredential) => Promise<AuthResult>;
    signOut: () => void;
    oAuthSignIn: (callback: (payload: OauthSignInCallbackPayload) => void) => void;
};

// Placeholder functions for handling sign-in, sign-up, and OAuth
const defaultFunctionPlaceHolder = async (): Promise<AuthResult> => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    return {
        status: '',
        message: '',
    };
};

const defaultOAuthSignInPlaceHolder = (
    callback: (payload: OauthSignInCallbackPayload) => void
): void => {
    callback({
        onSignIn: () => {},
        redirect: () => {},
    });
};

// Create Auth context
const AuthContext = createContext<Auth>({
    authenticated: false,
    user: null,
    signIn: async () => defaultFunctionPlaceHolder(),
    signUp: async () => defaultFunctionPlaceHolder(),
    signOut: () => {},
    oAuthSignIn: defaultOAuthSignInPlaceHolder,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Simulate sign-in function
    const signIn = async (values: SignInCredential): Promise<AuthResult> => {
        // Simulate successful sign-in
        setAuthenticated(true);
        setUser({ name: 'John Doe', email: 'johndoe@example.com' }); // Dummy user data
        return {
            status: 'success',
            message: 'Signed in successfully',
        };
    };

    // Simulate sign-up function
    const signUp = async (values: SignUpCredential): Promise<AuthResult> => {
        // Simulate successful sign-up
        setAuthenticated(true);
        setUser({ name: values.username, email: `${values.username}@example.com` }); // Dummy user data
        return {
            status: 'success',
            message: 'Signed up successfully',
        };
    };

    // Simulate sign-out function
    const signOut = () => {
        setAuthenticated(false);
        setUser(null); // Clear user data
    };

    // OAuth Sign-In function (example placeholder)
    const oAuthSignIn = (callback: (payload: OauthSignInCallbackPayload) => void) => {
        callback({
            onSignIn: () => signIn({ username: 'oauthUser', password: 'password' }), // Dummy OAuth Sign-In
            redirect: () => {}, // Example redirect function
        });
    };

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
    );
};

// Hook to access authentication context
export const useAuth = (): Auth => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
