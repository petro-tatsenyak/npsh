import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }))
  }
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setLastName(userInfo.lastName);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {

    };
  }, [userInfo])

  return <div className="profile">
    <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>Профіль Користувача</h2>
            </li>
            <li>
              {loading && <div>Завантаження...</div>}
              {error && <div>{error}</div>}
              {success && <div>Профіль Успішно Збережено.</div>}
            </li>
            <li>
              <label htmlFor="name">
                Ім'я
              </label>
              <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="lastName">
                Прізвище
              </label>
              <input value={lastName} type="lastName" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                Електронна пошта
          </label>
              <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">Пароль</label>
              <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>

            <li>
              <button type="submit" className="button primary">Зберегти</button>
            </li>
            <li>
              <button type="button" onClick={handleLogout} className="button secondary full-width">Вийти</button>
            </li>

          </ul>
        </form>
      </div>
    </div>
    <div className="profile-orders content-margined">
      {
        loadingOrders ? <div>Завантаження...</div> :
          errorOrders ? <div>{errorOrders} </div> :
            <table className="table">
              <thead>
                <tr>
                  <th>Номер Замовлення</th>
                  <th>Дата</th>
                  <th>Cума</th>
                  <th>Статус Оплати</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? 'Оплачено' : 'Не Оплачено'}</td>
                  <td>
                    <Link to={"/order/" + order._id}>Деталі</Link>
                  </td>
                </tr>)}
              </tbody>
            </table>
      }
    </div>
  </div>
}

export default ProfileScreen;
