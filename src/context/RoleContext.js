import { createContext, useState } from 'react';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState('user'); // 'user', 'vendor', 'admin'

    const switchRole = (newRole) => {
        setRole(newRole);
    };

    return (
        <RoleContext.Provider value={{ role, switchRole }}>
            {children}
        </RoleContext.Provider>
    );
};
