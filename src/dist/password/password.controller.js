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
exports.PasswordController = void 0;
const common_1 = require("@nestjs/common");
const password_service_1 = require("./password.service");
const create_password_dto_1 = require("./dto/create-password.dto");
const update_password_dto_1 = require("./dto/update-password.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PasswordController = class PasswordController {
    passwordService;
    constructor(passwordService) {
        this.passwordService = passwordService;
    }
    create(createPasswordDto) {
        return this.passwordService.create(createPasswordDto);
    }
    findAll() {
        return this.passwordService.findAll();
    }
    findOne(id) {
        return this.passwordService.findOne(id);
    }
    update(id, updatePasswordDto) {
        return this.passwordService.update(id, updatePasswordDto);
    }
    remove(id) {
        return this.passwordService.remove(id);
    }
};
exports.PasswordController = PasswordController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('addPassword'),
    (0, swagger_1.ApiOperation)({ summary: 'Yangi password qo‘shish' }),
    (0, swagger_1.ApiBody)({ type: create_password_dto_1.CreatePasswordDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Password muvaffaqiyatli qo‘shildi.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Xato maʼlumot kiritildi.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_password_dto_1.CreatePasswordDto]),
    __metadata("design:returntype", void 0)
], PasswordController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getAllPassword'),
    (0, swagger_1.ApiOperation)({ summary: 'Barcha passwordlarni olish' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Passwordlar ro‘yxati muvaffaqiyatli olindi.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PasswordController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getOnePassword/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Bitta passwordni olish' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Password ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password topildi.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Password topilmadi.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PasswordController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('updatePassword/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Passwordni yangilash' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Password ID' }),
    (0, swagger_1.ApiBody)({ type: update_password_dto_1.UpdatePasswordDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password muvaffaqiyatli yangilandi.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Password topilmadi.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", void 0)
], PasswordController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('deletePassword/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Passwordni o‘chirish' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Password ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password muvaffaqiyatli o‘chirildi.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Password topilmadi.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PasswordController.prototype, "remove", null);
exports.PasswordController = PasswordController = __decorate([
    (0, swagger_1.ApiTags)('Passwords'),
    (0, common_1.Controller)('pass'),
    __metadata("design:paramtypes", [password_service_1.PasswordService])
], PasswordController);
//# sourceMappingURL=password.controller.js.map