import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { DELIVERY_TYPES } from '../constants/deliveryConstants';
import {getPrice} from "../actions/deliveryActions";

const { SELF_PICKUP } = DELIVERY_TYPES;

function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { success } = orderCreate;
  const { price } = useSelector((state) => state.delivery);

  const { cartItems, shipping, payment } = cart;

  if (!shipping.deliveryType) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  const totalPrice = itemsPrice + price;


  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    const { _id } = await dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice: price,
      totalPrice
    }));
    if (payment.paymentMethod === 'card') {
      const result = await axios.get("/api/config/fondy?order_id=" + _id + "&amount=" + totalPrice);

      window.location.href = result.data.checkout_url;
    } else {
      props.history.push("/order/" + _id);
    }
  }

  useEffect(() => {
    if(shipping.deliveryType !== SELF_PICKUP) {
      const cost = cartItems.reduce((prev, curr) => prev + curr.price, 0);
      const weight = cartItems.length * 0.2;
      dispatch(getPrice({cityRef: shipping.cityRef, deliveryType: shipping.deliveryType, weight, cost}));
    }
  }, [price]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Доставка
          </h3>
          <div>
            {(shipping.deliveryType !== SELF_PICKUP) ?
            (`${cart.shipping.street || cart.shipping.warehouse}, м.${cart.shipping.city},
          ${cart.shipping.postalCode}, ${cart.shipping.country},`) :
            'Самовивіз'}
          </div>
        </div>
        <div>
          <h3>Оплата</h3>
          <div>
            Метод Оплати: {cart.payment.paymentMethod === "card" ? "Fondy" : "При отриманні"}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Список товарів
          </h3>
              <div>
                Ціна
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Список порожній
          </div>
                :
                cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
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
                      {item.price} грн
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
            <button className="button primary full-width" onClick={placeOrderHandler} >Замовити</button>
          </li>
          <li>
            <h3>Деталі Замовлення</h3>
          </li>
          <li>
            <div>Товари</div>
            <div>{itemsPrice} грн.</div>
          </li>
          <li>
            <div>Доставка</div>
            <div>{price} грн.</div>
          </li>
          <li>
            <div>Сума</div>
            <div>{totalPrice} грн.</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;
