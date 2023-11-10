import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './dto/token.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService    
    ) {}


    async login(email: string, password: string): Promise<AuthEntity> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = user.password === password;
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {    
            access_token: this.jwtService.sign({ id: user.id })
        };
    }
}
