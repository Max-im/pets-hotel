'use client';

import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { Pet } from "@prisma/client";

type SelectedPetType = Pet | null;

type PetsContextType = {
    selectedPet: SelectedPetType;
    setSelectedPet: Dispatch<SetStateAction<SelectedPetType>>;
};

export const PetsContext = createContext<PetsContextType>({selectedPet: null, setSelectedPet: () => {}});

export default function PetProvider({ children }: { children: ReactNode }) {
    const [selectedPet, setSelectedPet] = useState<SelectedPetType>(null);

    return (
        <PetsContext.Provider value={{ selectedPet, setSelectedPet }}>
            {children}
        </PetsContext.Provider>
    )
}
