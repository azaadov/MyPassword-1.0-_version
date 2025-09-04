import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Password } from 'schema/password.schema';
import { List } from 'schema/list.schema';
import { Model } from 'mongoose';
export declare class PasswordService {
    private passwordModel;
    private listModel;
    constructor(passwordModel: Model<Password>, listModel: Model<List>);
    create(createPasswordDto: CreatePasswordDto): Promise<{
        msg: string;
        data: import("mongoose").Document<unknown, {}, Password, {}, {}> & Password & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Password, {}, {}> & Password & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Password, {}, {}> & Password & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updatePasswordDto: UpdatePasswordDto): Promise<{
        msg: string;
        data: import("mongoose").Document<unknown, {}, Password, {}, {}> & Password & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        msg: string;
    }>;
}
