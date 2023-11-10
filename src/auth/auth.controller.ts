import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { string } from '@hapi/joi';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './dto/auth.entity';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOkResponse({ type: AuthEntity })
    async login(@Body() {email, password}: UserLoginDto){
        return this.authService.login(email, password);
    }

}          
