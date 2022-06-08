import userModel from './user.model';

const findUserByEmail = async (email) => userModel.findOne({ email }).lean();

const findUserByIdAndUpdate = async (id, update) => userModel.findByIdAndUpdate(id, update, { new: true });

const createUser = async (user) => userModel.create(user);

module.exports = {
  findUserByEmail,
  findUserByIdAndUpdate,
  createUser,
};
