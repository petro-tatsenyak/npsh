import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import { DELIVERY_TYPES } from '../constants/deliveryConstants';

import config from '../config';

const { IMAGE_LINK } = config;

const { SELF_PICKUP } = DELIVERY_TYPES;

function OrderScreen(props) {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(detailsOrder(props.match.params.id));
  }, []);

  const orderDetails = useSelector(state => state.orderDetails);

  const { loading, order, error } = orderDetails;

  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :
    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Доставка
          </h3>
            <div>
              {(order.shipping.deliveryType !== SELF_PICKUP) ?
                  (`${order.shipping.street || order.shipping.warehouse} ${order.shipping.city},
                  ${order.shipping.postalCode}, ${order.shipping.country},`) :
                  'Самовивіз'}
            </div>
            <div>
              {order.isDelivered ? "Доставлено " + order.deliveredAt : "Не Доставлено."}
            </div>
          </div>
          <div>
            <h3>Оплата</h3>
            <div>
              Метод Оплати: {order.payment.paymentMethod === 'cash' ? 'При отриманні' : 'Fondy'}
            </div>
            <div>
              {order.isPaid ? "Оплачено " + order.paidAt : "Не Оплачено."}
            </div>
            {order.payment_id && <div>
              Номер Оплати: {order.payment_id}
            </div>}
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Корзина
                </h3>
                <div>
                  Ціна
                </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Корзина порожня
                  </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={`${IMAGE_LINK}${item.image}`} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Кількість: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                        {item.price} грн.
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <h3>Деталі Замовлення</h3>
            </li>
            <li>
              <div>Товари</div>
              <div>{order.itemsPrice} грн.</div>
            </li>
            <li>
              <div>Доставка</div>
              <div>{order.shippingPrice} грн.</div>
            </li>
            <li>
              <div>Сума замовлення</div>
              <div>{order.totalPrice} грн.</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;
