import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebaes.config';

interface AuthContextType {
    user: any; // Replace 'any' with the actual type of your user object
    googleSignIn: () => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<any | null>(null);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user, googleSignIn, logOut }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useUserAuth must be used within an AuthContextProvider');
    }
    return context;
};
