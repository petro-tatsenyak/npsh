import orderRepository from './order.repository';

const getOrders = async () => orderRepository.findOrders();

const getUserOrders = async (user) => orderRepository.findUserOrders(user);

const getOrderById = async (id, user) => orderRepository.findUserOrderById(id, user);

const updateOrderById = async (id, update) => orderRepository.findOrderAndUpdate(id, update);

const deleteOrderById = async (id) => orderRepository.findOrderByIdAndDelete(id);

const createOrder = async (data) => {
  const order = {
    ...data,
  };

  return orderRepository.createOrder(order)
};

module.exports = {
  getOrders,
  getUserOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  createOrder,
};
