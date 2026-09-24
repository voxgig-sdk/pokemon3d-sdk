"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon3dError = void 0;
class Pokemon3dError extends Error {
    isPokemon3dError = true;
    sdk = 'Pokemon3d';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.Pokemon3dError = Pokemon3dError;
//# sourceMappingURL=Pokemon3dError.js.map