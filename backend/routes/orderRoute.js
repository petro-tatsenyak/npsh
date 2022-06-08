import express from 'express';
import ordersController from '../orders/order.controller';
import { isAuth, isAdmin } from '../util';
import orderService from '../orders/order.service';

const router = express.Router();

router.get('/', isAuth, ordersController.getOrders);

router.get('/mine', isAuth, ordersController.getOrdersByUser);

router.get('/:id', isAuth, ordersController.getOrderById);

router.delete('/:id', isAuth, isAdmin, ordersController.deleteOrder);

router.post('/', isAuth, ordersController.createOrder);

router.post('/:id', async (req, res) => {
  const update = {
    payment: {
      paymentMethod: 'fondy',
    },
    isPaid: true,
    paidAt: Date.now(),
  };

  const order = await orderService.updateOrderById(req.params.id, update);

  if (!order) {
    return res.status(404).send({ message: 'Order Not Found' });
  }
  return res.writeHead(301, {
    Location: `http://localhost:3000/order/${req.params.id}`,
  }).end();
});

export default router;
