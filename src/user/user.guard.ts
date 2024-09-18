import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if(!token) throw new UnauthorizedException("You are not authorized!");

        try{
            const upload = await this.jwtService.verifyAsync(
                token, { secret: process.env.JWT_TOKEN }
            );

            request['user'] = upload;
        } catch(err) {
            throw new UnauthorizedException("Not authorized!");
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }

}
