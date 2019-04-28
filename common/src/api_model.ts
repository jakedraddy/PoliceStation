import { Person } from './station';

export class AuthResult {
    result: Boolean
    user?: Person

    constructor(res: Boolean) {
        this.result = res;
        this.user = undefined;
    }
}