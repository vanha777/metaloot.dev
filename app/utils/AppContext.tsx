import { createContext, useContext, ReactNode, useState, useCallback } from 'react';

export interface UserData {
    id?: string;
    email?: string;
    name?: string;
    avatar?: string;
    [key: string]: any;
}

export interface GameData {
    id?: string;
    name?: string;
    genre?: string;
    publisher?: string;
    photo?: string;
    releaseDate?: string;
    description?: string;
    symbol?: string;
}

export interface AuthData {
    accessToken: string | null;
    refreshToken: string | null;
    userData: UserData | null;
    gameData: GameData[] | null;
    isAuthenticated: boolean;
}

export interface AppContextData {
    auth: AuthData;
    setTokens: (accessToken: string, refreshToken: string) => void;
    setUser: (userData: UserData) => void;
    setGame: (gameData: GameData[]) => void;
    logout: () => void;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    const [auth, setAuth] = useState<AuthData>({
        accessToken: null,
        refreshToken: null,
        userData: null,
        gameData: null,
        isAuthenticated: false,
    });

    const setTokens = useCallback((accessToken: string, refreshToken: string) => {
        setAuth(prev => ({
            ...prev,
            accessToken,
            refreshToken,
            isAuthenticated: true,
        }));
    }, []);

    const setUser = useCallback((userData: UserData) => {
        setAuth(prev => ({
            ...prev,
            userData,
        }));
    }, []);

    const setGame = useCallback((gameData: GameData[]) => {
        setAuth(prev => ({
            ...prev,
            gameData,
        }));
    }, []);

    const logout = useCallback(() => {
        setAuth({
            accessToken: null,
            refreshToken: null,
            userData: null,
            gameData: null,
            isAuthenticated: false,
        });
    }, []);

    const value: AppContextData = {
        auth,
        setTokens,
        setUser,
        setGame,
        logout
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
