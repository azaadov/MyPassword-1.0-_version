import { PasswordService } from './password.service';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class PasswordController {
    private readonly passwordService;
    constructor(passwordService: PasswordService);
    create(createPasswordDto: CreatePasswordDto): Promise<{
        msg: string;
        data: import("mongoose").Document<unknown, {}, import("../schema/password.schema").Password, {}, {}> & import("../schema/password.schema").Password & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schema/password.schema").Password, {}, {}> & import("../schema/password.schema").Password & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schema/password.schema").Password, {}, {}> & import("../schema/password.schema").Password & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updatePasswordDto: UpdatePasswordDto): Promise<{
        msg: string;
        data: import("mongoose").Document<unknown, {}, import("../schema/password.schema").Password, {}, {}> & import("../schema/password.schema").Password & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        msg: string;
    }>;
}
