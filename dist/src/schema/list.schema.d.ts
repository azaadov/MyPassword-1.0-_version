import { Document, Types } from 'mongoose';
export declare class List extends Document {
    name: string;
    passwords: Types.ObjectId[];
    userId: Types.ObjectId;
}
export declare const ListSchema: import("mongoose").Schema<List, import("mongoose").Model<List, any, any, any, Document<unknown, any, List, any, {}> & List & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, List, Document<unknown, {}, import("mongoose").FlatRecord<List>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<List> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
