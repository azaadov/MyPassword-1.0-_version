import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Password } from '../schema/password.schema';
import { List } from '../schema/list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class PasswordService {
  constructor(
    @InjectModel(Password.name) private passwordModel: Model<Password>,
    @InjectModel(List.name) private listModel: Model<List>,
  ) {}

  async create(createPasswordDto: CreatePasswordDto) {
    const { listId } = createPasswordDto;

    // 1. ObjectId formatini tekshirish
    if (!Types.ObjectId.isValid(listId)) {
      throw new BadRequestException(`Invalid listId format`);
    }

    // 2. List mavjudligini tekshirish
    const list = await this.listModel.findById(listId);
    if (!list) {
      throw new NotFoundException(`List with id ${listId} not found`);
    }

    // 3. Password qo‘shish
    const newPassword = await new this.passwordModel(createPasswordDto);
    await newPassword.save();

    if (!list.passwords) {
      list.passwords = [];
    }
    list.passwords.push(newPassword._id as Types.ObjectId);
    await list.save();

    return { msg: 'Added new password', data: newPassword };
  }

  async findAll() {
    // listId ni ham to‘liq populate qilib olish mumkin
    return await this.passwordModel.find().populate('listId').exec();
  }

  async findOne(id: string) {
    const password = await this.passwordModel.findById(id).exec();
    if (!password) {
      throw new NotFoundException(`Password with id ${id} not found`);
    }
    return password;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const updatedPassword = await this.passwordModel.findByIdAndUpdate(
      id,
      updatePasswordDto,
      { new: true },
    );
    if (!updatedPassword) {
      throw new NotFoundException(`Password with id ${id} not found`);
    }
    return { msg: 'Password updated successfully', data: updatedPassword };
  }

  async remove(id: string) {
    // 1. Passwordni topish
    const deleted = await this.passwordModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Password with id ${id} not found`);
    }
  
    // 2. Uni list ichidan ham o‘chirish
    await this.listModel.updateOne(
      { _id: deleted.listId },            
      { $pull: { passwords: deleted._id } }
    );
  
    return { msg: 'Password removed successfully' };
  }
  
}
