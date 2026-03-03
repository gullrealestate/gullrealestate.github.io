import React, { createContext, useContext, useState, useEffect } from 'react';

interface PolicyContextType {
    hasAcceptedPolicy: boolean;
    acceptPolicy: () => void;
}

const PolicyContext = createContext<PolicyContextType | undefined>(undefined);

export const PolicyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);

    // Optional: Persist within session to avoid annoying users if they refresh
    useEffect(() => {
        const stored = sessionStorage.getItem('gull_policy_accepted');
        if (stored === 'true') {
            setHasAcceptedPolicy(true);
        }
    }, []);

    const acceptPolicy = () => {
        setHasAcceptedPolicy(true);
        sessionStorage.setItem('gull_policy_accepted', 'true');
    };

    return (
        <PolicyContext.Provider value={{ hasAcceptedPolicy, acceptPolicy }}>
            {children}
        </PolicyContext.Provider>
    );
};

export const usePolicy = () => {
    const context = useContext(PolicyContext);
    if (!context) {
        throw new Error('usePolicy must be used within a PolicyProvider');
    }
    return context;
};
