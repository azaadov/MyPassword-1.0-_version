import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { List } from '../schema/list.schema';
import { Password } from '../schema/password.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private listModel: Model<List>,
    @InjectModel(Password.name) private passwordModel: Model<Password>, // ✅ shu joy qo‘shildi
  ) { }

  async create(createListDto: CreateListDto, userId: string) {
    const newList = new this.listModel({
      ...createListDto,
      userId,
    });
    await newList.save();
    return { msg: 'Added new list', data: newList };
  }

  async findAll(userId: string) {
    return this.listModel.find({ userId }).populate('passwords').exec();
  }

  async findOne(id: string) {
    const list = await this.listModel.findById(id).exec();
    if (!list) throw new NotFoundException(`List with id ${id} not found`);
    return list;
  }

  async search(query: string) {
    const lists = await this.listModel.find({
      name: { $regex: query, $options: 'i' },
    });
    if (lists.length === 0)
      throw new NotFoundException(`No lists found matching "${query}"`);
    return { msg: `Found ${lists.length} lists`, data: lists };
  }

  async getListById(id: string) {
    const list = await this.listModel.findById(id).populate('passwords').exec();
    if (!list) throw new NotFoundException(`List with id ${id} not found`);
    return list;
  }

  async addPassword(
    listId: string,
    dto: { name: string; password: string; desc: string }
  ) {

    const list = await this.listModel.findById(listId);
    if (!list) throw new NotFoundException(`List with id ${listId} not found`);


    const password = await this.passwordModel.create({
      ...dto,
      listId: new Types.ObjectId(listId),
    });

    await this.listModel.updateOne(
      { _id: listId },
      { $addToSet: { passwords: password._id } }
    );

    return { msg: 'Password qo‘shildi', data: password };
  }

  async update(id: string, updateListDto: UpdateListDto) {
    const updatedList = await this.listModel.findByIdAndUpdate(
      id,
      updateListDto,
      { new: true },
    );
    if (!updatedList) throw new NotFoundException(`List with id ${id} not found`);
    return { msg: 'List updated successfully', data: updatedList };
  }

  async remove(id: string) {
    const deletedList = await this.listModel.findByIdAndDelete(id).exec();
    if (!deletedList) throw new NotFoundException(`List with id ${id} not found`);
    return { msg: 'List deleted successfully' };
  }
}
