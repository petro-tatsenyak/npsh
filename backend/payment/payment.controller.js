import { FONDY_MERCHANT_ID, FONDY_SECRET_KEY, SERVER_URL }  from  '../config';
import CloudIpsp from 'cloudipsp-node-js-sdk';
import orderService from  "../orders/order.service";

const getCheckoutLink = async (req, res, next) => {
  const { order_id, amount } = req.query;

  try {
    const fondy = new CloudIpsp({
      merchantId: FONDY_MERCHANT_ID,
      secretKey: FONDY_SECRET_KEY,
    });

    const data = {
      server_callback_url: `${SERVER_URL}/orders/${order_id}`,
      response_url: `${SERVER_URL}/orders/${order_id}`,
      order_id,
      order_desc: 'Books order',
      currency: 'UAH',
      amount: amount * 100,
    };

    const response = await fondy.Checkout(data);

    await orderService.updateOrderById(order_id, { payment_id: response.payment_id });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCheckoutLink,
};
