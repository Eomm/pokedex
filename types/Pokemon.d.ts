/**
 * Pokemon
 * A Pokemon
 */
declare interface Pokemon {
    id?: number;
    name: string;
    height: number;
    weight: number;
    generation: number;
    isBaby: string;
    isLegendary: string;
    isMythical: string;
    colorId: number;
    evolutionChainId?: number | null;
}

export { Pokemon };
