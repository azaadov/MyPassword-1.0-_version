import { Model } from 'mongoose';
import { User } from 'schema/User.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
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
