import { SpecialEffectsContext } from '@/util/contexts/SpecialEffectsContext';
import { useSpecialEffects } from '@/util/hooks/useSpecialEffects';
import SpecialEffects from './SpecialEffects';

export function SpecialEffectsProvider({ children }: { children: React.ReactNode }) {
    const specialEffects = useSpecialEffects();

    return (
        <SpecialEffectsContext.Provider value={specialEffects}>
            {children}
            <SpecialEffects canvasRef={specialEffects.canvasRef} />
        </SpecialEffectsContext.Provider>
    );
}
