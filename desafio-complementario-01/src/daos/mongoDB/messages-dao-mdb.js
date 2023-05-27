import { messageModel } from './models/message-model';

export default class MessagesDaoMongo {
  async createMessage() {
    try {
      const response = await messageModel.create();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllMessages() {
    try {
      const response = await messageModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getMessageById(id) {
    try {
      const response = await messageModel.findById(id);
      if (!response) throw new Error('message not found');
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async updateMessage(object, id) {
    try {
      await messageModel.updateOne(object, { _id: id });
      console.log(`message with id ${id} updated successfully`);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteMessageById(id) {
    try {
      await messageModel.findByIdAndDelete(id);
      console.log(`message with id ${id} deleted successfully`);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAllMessages() {
    try {
      await messageModel.deleteMany({});
    } catch (error) {}
  }
}
