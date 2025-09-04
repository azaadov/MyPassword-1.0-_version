import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from 'src/schema/list.schema';
import { Password } from 'src/schema/password.schema';
import { Model } from 'mongoose';
export declare class ListService {
    private listModel;
    private passwordModel;
    constructor(listModel: Model<List>, passwordModel: Model<Password>);
    create(createListDto: CreateListDto, userId: string): Promise<{
        msg: string;
        data: import("mongoose").Document<unknown, {}, List, {}, {}> & List & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findAll(userId: string): Promise<(import("mongoose").Document<unknown, {}, List, {}, {}> & List & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, List, {}, {}> & List & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    search(query: string): Promise<{
        msg: string;
        data: (import("mongoose").Document<unknown, {}, List, {}, {}> & List & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    getListById(id: string): Promise<import("mongoose").Document<unknown, {}, List, {}, {}> & List & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addPassword(listId: string, dto: {
        name: string;
        password: string;
        desc: string;
    }): Promise<{
        msg: string;
        data: import("mongoose").Document<unknown, {}, Password, {}, {}> & Password & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateListDto: UpdateListDto): Promise<{
        msg: string;
        data: import("mongoose").Document<unknown, {}, List, {}, {}> & List & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        msg: string;
    }>;
}
