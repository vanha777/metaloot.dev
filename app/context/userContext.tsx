import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the User type
export type User = {
  publicKey: string;
  mtl?: string;
};

// Define the Context's type
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Create the User Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the Provider's Props
type UserProviderProps = {
  children: ReactNode;
};

// Create a provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the User Context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
