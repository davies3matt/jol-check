import { Auth } from 'aws-amplify';
import React, {createContext, useState, useContext} from 'react';

interface ContextType {
    isAuthenticating: boolean;
    authData: AuthData;
    signIn: (d: LoginDetails) => Promise<void>;
    signOut(): Promise<void>;
}

interface AuthData {
    token: string,
    username: string
}

const DEFAULT_STATE:ContextType = {
    isAuthenticating: false,
    authData: {
        username: '',
        token: ''
    },
    signIn: (d: LoginDetails) => Promise.resolve(),
    signOut: () => Promise.resolve(),
};

interface LoginDetails {
    username: string,
    password: string
}

export const AuthContext = createContext<ContextType>(DEFAULT_STATE);
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider: React.FC = ({ children }) => {
    const [authData, updateAuthData] = useState(DEFAULT_STATE.authData);
    const [isAuthenticating, updateIsAuthenticating] = useState(DEFAULT_STATE.isAuthenticating);

    const signIn = async (values: LoginDetails) => {
        try {
            // update auth loading state
            updateIsAuthenticating(true);
            // sign in user
            const user = await Auth.signIn(values.username, values.password);
            // update auth loading state
            updateIsAuthenticating(false);
            // set auth context
            updateAuthData({
                token: user.signInUserSession.accessToken.jwtToken,
                username: user.attributes.sub,
            });
        } catch (error) {
            console.log(error);
        }
        return Promise.resolve();
    }

    const signOut = async () => {
        // sign out user
        await Auth.signOut();
        updateAuthData(DEFAULT_STATE.authData);
    }

    return (
        <AuthContext.Provider value={{
            authData,
            isAuthenticating,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;