import { createContext, useContext } from 'react';

export const CallErrorContext = createContext<{ showCallError: () => void }>({ 
    showCallError: () => { } 
});

export const useCallError = () => useContext(CallErrorContext);
