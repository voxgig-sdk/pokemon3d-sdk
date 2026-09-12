import { Context } from './Context';
declare class Pokemon3dError extends Error {
    isPokemon3dError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { Pokemon3dError };
