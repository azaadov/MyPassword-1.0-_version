import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterAuthDto): Promise<{
        message: string;
        user: {
            id: unknown;
            email: string;
            name: string;
        };
    }>;
    login(dto: LoginAuthDto): Promise<{
        access_token: string;
    }>;
}
