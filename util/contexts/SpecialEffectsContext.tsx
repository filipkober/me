import { createContext, useContext } from 'react';
import { UseSpecialEffectsReturnType } from '../hooks/useSpecialEffects';

export const SpecialEffectsContext = createContext<UseSpecialEffectsReturnType | null>(null);

export const useSpecialEffectsContext = () => {
    const context = useContext(SpecialEffectsContext);
    if (!context) {
        throw new Error('useSpecialEffectsContext must be used within a SpecialEffectsProvider');
    }
    return context;
};
