import orderModel from './order.model';

const findUserOrderById = async (id, user) => orderModel.findOne({ _id: id, user }).populate('user');

const findOrders = async () => orderModel.find().populate('user');

const findUserOrders = async (user) => orderModel.find({ user });

const findOrderAndUpdate = async (id, update) => orderModel.findByIdAndUpdate(id, update, { new: true });

const findOrderByIdAndDelete = async (id) => orderModel.findByIdAndDelete(id);

const createOrder = async (order) => orderModel.create(order);

module.exports = {
  findUserOrderById,
  findOrders,
  findUserOrders,
  findOrderAndUpdate,
  findOrderByIdAndDelete,
  createOrder,
};
