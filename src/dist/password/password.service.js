"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const common_1 = require("@nestjs/common");
const password_schema_1 = require("../schema/password.schema");
const list_schema_1 = require("../schema/list.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PasswordService = class PasswordService {
    passwordModel;
    listModel;
    constructor(passwordModel, listModel) {
        this.passwordModel = passwordModel;
        this.listModel = listModel;
    }
    async create(createPasswordDto) {
        const { listId } = createPasswordDto;
        if (!mongoose_2.Types.ObjectId.isValid(listId)) {
            throw new common_1.BadRequestException(`Invalid listId format`);
        }
        const list = await this.listModel.findById(listId);
        if (!list) {
            throw new common_1.NotFoundException(`List with id ${listId} not found`);
        }
        const newPassword = await new this.passwordModel(createPasswordDto);
        await newPassword.save();
        if (!list.passwords) {
            list.passwords = [];
        }
        list.passwords.push(newPassword._id);
        await list.save();
        return { msg: 'Added new password', data: newPassword };
    }
    async findAll() {
        return await this.passwordModel.find().populate('listId').exec();
    }
    async findOne(id) {
        const password = await this.passwordModel.findById(id).exec();
        if (!password) {
            throw new common_1.NotFoundException(`Password with id ${id} not found`);
        }
        return password;
    }
    async update(id, updatePasswordDto) {
        const updatedPassword = await this.passwordModel.findByIdAndUpdate(id, updatePasswordDto, { new: true });
        if (!updatedPassword) {
            throw new common_1.NotFoundException(`Password with id ${id} not found`);
        }
        return { msg: 'Password updated successfully', data: updatedPassword };
    }
    async remove(id) {
        const deleted = await this.passwordModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new common_1.NotFoundException(`Password with id ${id} not found`);
        }
        await this.listModel.updateOne({ _id: deleted.listId }, { $pull: { passwords: deleted._id } });
        return { msg: 'Password removed successfully' };
    }
};
exports.PasswordService = PasswordService;
exports.PasswordService = PasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(password_schema_1.Password.name)),
    __param(1, (0, mongoose_1.InjectModel)(list_schema_1.List.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PasswordService);
//# sourceMappingURL=password.service.js.map