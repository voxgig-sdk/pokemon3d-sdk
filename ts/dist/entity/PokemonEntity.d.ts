import { Pokemon3dEntityBase } from '../Pokemon3dEntityBase';
import type { Pokemon3dSDK } from '../Pokemon3dSDK';
import type { Control } from '../types';
import type { Pokemon, PokemonLoadMatch, PokemonListMatch } from '../Pokemon3dTypes';
declare class PokemonEntity extends Pokemon3dEntityBase<Pokemon> {
    constructor(client: Pokemon3dSDK, entopts: any);
    make(this: PokemonEntity): PokemonEntity;
    load(this: any, reqmatch?: PokemonLoadMatch, ctrl?: Control): Promise<PokemonEntity>;
    list(this: any, reqmatch?: PokemonListMatch, ctrl?: Control): Promise<PokemonEntity[]>;
}
export { PokemonEntity };
