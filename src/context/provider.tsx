// User and admin panel layout provider
import { createContext, useContext } from "react";

type UserResponse = {
    message: string,
    name: string,
    email: string,
    role: number,
};

type AdminResponse = {
    message: string,
    name: string,
    email: string,
    role: number,
};

// User panel provider
export const UserContext =
createContext<UserResponse | null>(null);

// custom hook 
export const useUserPanel = () => {
    return useContext(UserContext)
};

// wrapper
export const UserPanelProvider = 
({ value, children }: { value: UserResponse | null; children: React.ReactNode }) => {
        return <UserContext.Provider value={value}>
                    {children}
               </UserContext.Provider>
    };


// Admin panel provider
export const AdminContext = 
createContext<AdminResponse | null>(null);

export const useAdminPanel = () => {
    return useContext(AdminContext);
};

export const AdminPanelProvider = 
({ value, children }: { value: UserResponse | null; children: React.ReactNode }) => {
        return <AdminContext.Provider value={value}>
                    {children}
               </AdminContext.Provider>
    };