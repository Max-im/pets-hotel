import { PetsContext } from "@/providers/petProvider";
import { useContext } from "react";

export function usePetContext() {
    const context = useContext(PetsContext);
    if (!context) {
        throw new Error("usePetContext must be used within a PetProvider");
    }
    return context;
}