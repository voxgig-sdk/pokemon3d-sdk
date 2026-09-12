export interface Pokemon {
    availableForms?: any[];
    fileSize?: number;
    form?: string;
    forms?: any[];
    generation?: number;
    id?: number;
    modelFormat?: string;
    modelUrl?: string;
    name?: string;
    textureUrl?: string;
    thumbnailUrl?: string;
    type?: any[];
}
export interface PokemonLoadMatch {
    id: string;
    form?: string;
}
export interface PokemonListMatch {
    limit?: number;
    offset?: number;
}
