import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
}

export const UserGuard = () => UseGuards(JwtGuard);