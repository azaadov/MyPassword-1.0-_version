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
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const list_schema_1 = require("../schema/list.schema");
const password_schema_1 = require("../schema/password.schema");
const mongoose_2 = require("mongoose");
let ListService = class ListService {
    listModel;
    passwordModel;
    constructor(listModel, passwordModel) {
        this.listModel = listModel;
        this.passwordModel = passwordModel;
    }
    async create(createListDto, userId) {
        const newList = new this.listModel({
            ...createListDto,
            userId,
        });
        await newList.save();
        return { msg: 'Added new list', data: newList };
    }
    async findAll(userId) {
        return this.listModel.find({ userId }).populate('passwords').exec();
    }
    async findOne(id) {
        const list = await this.listModel.findById(id).exec();
        if (!list)
            throw new common_1.NotFoundException(`List with id ${id} not found`);
        return list;
    }
    async search(query) {
        const lists = await this.listModel.find({
            name: { $regex: query, $options: 'i' },
        });
        if (lists.length === 0)
            throw new common_1.NotFoundException(`No lists found matching "${query}"`);
        return { msg: `Found ${lists.length} lists`, data: lists };
    }
    async getListById(id) {
        const list = await this.listModel.findById(id).populate('passwords').exec();
        if (!list)
            throw new common_1.NotFoundException(`List with id ${id} not found`);
        return list;
    }
    async addPassword(listId, dto) {
        const list = await this.listModel.findById(listId);
        if (!list)
            throw new common_1.NotFoundException(`List with id ${listId} not found`);
        const password = await this.passwordModel.create({
            ...dto,
            listId: new mongoose_2.Types.ObjectId(listId),
        });
        await this.listModel.updateOne({ _id: listId }, { $addToSet: { passwords: password._id } });
        return { msg: 'Password qo‘shildi', data: password };
    }
    async update(id, updateListDto) {
        const updatedList = await this.listModel.findByIdAndUpdate(id, updateListDto, { new: true });
        if (!updatedList)
            throw new common_1.NotFoundException(`List with id ${id} not found`);
        return { msg: 'List updated successfully', data: updatedList };
    }
    async remove(id) {
        const deletedList = await this.listModel.findByIdAndDelete(id).exec();
        if (!deletedList)
            throw new common_1.NotFoundException(`List with id ${id} not found`);
        return { msg: 'List deleted successfully' };
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(list_schema_1.List.name)),
    __param(1, (0, mongoose_1.InjectModel)(password_schema_1.Password.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ListService);
//# sourceMappingURL=list.service.js.map