import orderService from './order.service';

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();

    return res.json(orders);
  } catch (error) {
    return next(error);
  }
};

const getOrdersByUser = async (req, res, next) => {
  const { _id: user } = req.user;

  try {
    const orders = await orderService.getUserOrders(user);

    return res.json(orders);
  } catch (error) {
    return next(error);
  }
};

const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: user } = req.user;

  try {
    const order = await orderService.getOrderById(id, user);

    if (!order) return res.status(404).send({ message: 'Order Not Found.' });

    return res.send(order);
  } catch (error) {
    return next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await orderService.deleteOrderById(id);

    if (!order) {
      return res.status(404).send({ message: 'Order Not Found' });
    }

    return res.status(201).send({
      data: order,
      message: 'Order deleted successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

const createOrder = async (req, res, next) => {
  const data = req.body;
  const { _id: user } = req.user;

  try {
    data.user = user;
    const newOrder = await orderService.createOrder(data);

    if (!newOrder) {
      return res.status(404).send({ message: 'Order Not Created' });
    }

    return res.status(200).send({
      data: newOrder,
      message: 'Order created successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getOrders,
  getOrdersByUser,
  getOrderById,
  deleteOrder,
  createOrder,
};
