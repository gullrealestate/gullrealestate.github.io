import React, { createContext, useContext, useState } from 'react';

interface PolicyContextType {
    hasAcceptedPolicy: boolean;
    acceptPolicy: () => void;
}

const PolicyContext = createContext<PolicyContextType | undefined>(undefined);

export const PolicyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // In-memory only — resets on every page load/refresh
    const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);

    const acceptPolicy = () => {
        setHasAcceptedPolicy(true);
    };

    return (
        <PolicyContext.Provider value={{ hasAcceptedPolicy, acceptPolicy }}>
            {children}
        </PolicyContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePolicy = () => {
    const context = useContext(PolicyContext);
    if (!context) {
        throw new Error('usePolicy must be used within a PolicyProvider');
    }
    return context;
};
