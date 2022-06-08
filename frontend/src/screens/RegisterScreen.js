import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, lastName, email, password));
  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Реєстрація</h2>
        </li>
        <li>
          {loading && <div>Завантаження...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Ім'я
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="lastName">
            Прізвище
          </label>
          <input type="lastName" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="email">
            Електронна пошта
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Пароль</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="rePassword">Повторити Пароль</label>
          <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Зареєструватись</button>
        </li>
        <li>
          Вже зареєстрований?
          <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Авторизуватись</Link>

        </li>

      </ul>
    </form>
  </div>
}
export default RegisterScreen;
