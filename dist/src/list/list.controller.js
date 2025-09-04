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
exports.ListController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const list_service_1 = require("./list.service");
const create_list_dto_1 = require("./dto/create-list.dto");
const update_list_dto_1 = require("./dto/update-list.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ListController = class ListController {
    listService;
    constructor(listService) {
        this.listService = listService;
    }
    create(createListDto, req) {
        return this.listService.create(createListDto, req.user.userId);
    }
    findAll(req) {
        return this.listService.findAll(req.user.userId);
    }
    findOne(id) {
        return this.listService.findOne(id);
    }
    async search(query) {
        return this.listService.search(query);
    }
    update(id, updateListDto) {
        return this.listService.update(id, updateListDto);
    }
    remove(id) {
        return this.listService.remove(id);
    }
    async getListById(id) {
        return this.listService.getListById(id);
    }
    async addPassword(id, dto) {
        return this.listService.addPassword(id, dto);
    }
};
exports.ListController = ListController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('addList'),
    (0, swagger_1.ApiOperation)({ summary: 'Yangi list qo‘shish' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'List muvaffaqiyatli qo‘shildi.' }),
    (0, swagger_1.ApiBody)({ type: create_list_dto_1.CreateListDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_list_dto_1.CreateListDto, Object]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getAllList'),
    (0, swagger_1.ApiOperation)({ summary: 'Barcha listlarni olish' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Barcha listlar qaytarildi.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('findOneList/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Bitta listni olish' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List topildi.' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'List ID si' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Listni qidirish' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List...' }),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "search", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('updateList/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Listni yangilash' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List muvaffaqiyatli yangilandi.' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'List ID si' }),
    (0, swagger_1.ApiBody)({ type: update_list_dto_1.UpdateListDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_list_dto_1.UpdateListDto]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('deleteList/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Listni o‘chirish' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List muvaffaqiyatli o‘chirildi.' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'List ID si' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'List sahifasi' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'List sahifasi ochildi.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "getListById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('addPassword/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "addPassword", null);
exports.ListController = ListController = __decorate([
    (0, swagger_1.ApiTags)('List'),
    (0, common_1.Controller)('list'),
    __metadata("design:paramtypes", [list_service_1.ListService])
], ListController);
//# sourceMappingURL=list.controller.js.map