const { UserMethods } = require('../dao/factory.js');

class UserService{ 
    async getAll(){
        try {
            const users = await UserMethods.find() 
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getById(_id) { 
        const user = await UserMethods.findOne({ _id: _id });
        return user;
      }
      async createOne(data) {
        const user = await UserMethods.createOne(data);
        return user;
      } 
      async deletedOne(_id) {
        const deleted = await UserMethods.deleteOne({ _id: _id });
        return deleted;
      }
      async updateOne(_id, firstName, lastName, email, age, password, rol) {
        const userUpDate = await UserMethods.updateOne(
          { _id: _id },
          { firstName, lastName, email, age, password, rol }
        );
        return userUpDate;
      }
}
module.exports = UserService