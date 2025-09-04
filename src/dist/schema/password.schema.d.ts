import { Document, Types } from 'mongoose';
export declare class Password extends Document {
    name: string;
    password: string;
    desc: string;
    listId: Types.ObjectId;
}
export declare const PasswordSchema: import("mongoose").Schema<Password, import("mongoose").Model<Password, any, any, any, Document<unknown, any, Password, any, {}> & Password & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Password, Document<unknown, {}, import("mongoose").FlatRecord<Password>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Password> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
