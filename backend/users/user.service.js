import userRepository from './user.repository';

const getUserByEmail = async (email) => userRepository.findUserByEmail(email);

const createUser = async (user) => userRepository.createUser(user);

const updateUserById = async (id, update) => userRepository.findUserByIdAndUpdate(id, update);

module.exports = {
  getUserByEmail,
  createUser,
  updateUserById,
};
