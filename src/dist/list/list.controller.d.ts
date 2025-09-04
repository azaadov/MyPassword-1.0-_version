import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
export declare class ListController {
    private readonly listService;
    constructor(listService: ListService);
    create(createListDto: CreateListDto, req: any): Promise<{
        msg: string;
        data: import("mongoose").Document<unknown, {}, import("../schema/list.schema").List, {}, {}> & import("../schema/list.schema").List & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findAll(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schema/list.schema").List, {}, {}> & import("../schema/list.schema").List & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schema/list.schema").List, {}, {}> & import("../schema/list.schema").List & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    search(query: string): Promise<{
        msg: string;
        data: (import("mongoose").Document<unknown, {}, import("../schema/list.schema").List, {}, {}> & import("../schema/list.schema").List & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    update(id: string, updateListDto: UpdateListDto): Promise<{
        msg: string;
        data: import("mongoose").Document<unknown, {}, import("../schema/list.schema").List, {}, {}> & import("../schema/list.schema").List & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        msg: string;
    }>;
    getListById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schema/list.schema").List, {}, {}> & import("../schema/list.schema").List & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addPassword(id: string, dto: {
        name: string;
        password: string;
        desc: string;
    }): Promise<{
        msg: string;
        data: import("mongoose").Document<unknown, {}, import("../schema/password.schema").Password, {}, {}> & import("../schema/password.schema").Password & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
