import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import {listCities, listStreets, listWarehouses, getPrice} from "../actions/deliveryActions";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import { DELIVERY_TYPES } from '../constants/deliveryConstants';

const { WAREHOUSE_WAREHOUSE, WAREHOUSE_DOORS, SELF_PICKUP } = DELIVERY_TYPES;

function ShippingScreen(props) {
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [deliveryType, setDeliveryType] = useState(SELF_PICKUP);
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [cityRef, setCityRef] = useState('');

  const dispatch = useDispatch();
  const { cities, streets, warehouses, price, loading } = useSelector((state) => state.delivery);
  const { cartItems } = useSelector(state => state.cart);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ street, city, postalCode, country, warehouse, deliveryType, cityRef }));
    props.history.push('payment');
  }

  const handleCityFind = (event) => {
    setCity(event.target.value);
    dispatch(listCities(event.target.value));
  }

  const handleStreetFind = (event) => {
    setStreet(event.target.value);
    dispatch(listStreets(cityRef, event.target.value))
  }

  const handleWarehouseFind = (event) => {
    setWarehouse(event.target.value);
    dispatch(listWarehouses(city))
  }


  const handleChangeDeliveryType = (event) => {
    setDeliveryType(event.target.value);
  }


  const handleCalculateDeliveryPrice = (event) => {
    const cost = cartItems.reduce((prev, curr) => prev + curr.price, 0);
    const weight = cartItems.length * 0.2;
    dispatch(getPrice({ cityRef, deliveryType, weight, cost }));
  }

  return <div>

    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={(event) => {
        event.preventDefault();
      }}>
        <ul className="form-container">
          <li>
            <h2>Доставка</h2>
          </li>
          <li>
            <label htmlFor="country">
                Спосіб доставки
            </label>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={SELF_PICKUP}
                        onChange={handleChangeDeliveryType}
                    >
                        <MenuItem value={SELF_PICKUP}>Самовивіз</MenuItem>
                        <MenuItem value={WAREHOUSE_WAREHOUSE}>Доставка на відділння</MenuItem>
                        <MenuItem value={WAREHOUSE_DOORS}>Курєрська доставка</MenuItem>
                    </Select>
                </FormControl>
            </Box>
          </li>
          {[WAREHOUSE_WAREHOUSE, WAREHOUSE_DOORS].includes(deliveryType) && <li>
            <label htmlFor="country">
              Країна
            </label>
            <TextField

                name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
            </TextField>
          </li>}
          {[WAREHOUSE_WAREHOUSE, WAREHOUSE_DOORS].includes(deliveryType) && <li>
            <label htmlFor="city">
              Місто
            </label>
            <Autocomplete
                disablePortal
                id="city"
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={cities}
                loading={loading}

                onChange={(event, value) => {
                  setCityRef(value.ref);
                  setCity(value.label)
                }}
                renderInput={(params) =>(
                    <TextField
                        onChange={handleCityFind} {...params}

                        InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                      ),
                    }} />
                )}
            />
          </li>}
          {deliveryType === WAREHOUSE_DOORS && <li>
            <label htmlFor="address">
              Вулиця
            </label>
            <Autocomplete
                disablePortal
                id="address"
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={streets}
                loading={loading}
                onChange={(event, value) => setStreet(value.label)}
                renderInput={(params) =>(
                    <TextField
                        onChange={handleStreetFind} {...params}

                        InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                      ),
                    }} />
                )}
            />
          </li>}
          {deliveryType === WAREHOUSE_WAREHOUSE && <li>
              <label htmlFor="warehouse">
                Відділення
              </label>
              <Autocomplete
                  disablePortal
                  id="warehouse"
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  options={warehouses}
                  loading={loading}
                  onChange={(event, value) => setWarehouse(value.label)}
                  renderInput={(params) =>(
                      <TextField
                          onSelect={handleWarehouseFind} {...params}

                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                          }} />
                  )}
              />
          </li>}
          {[WAREHOUSE_WAREHOUSE, WAREHOUSE_DOORS].includes(deliveryType) && <li>
            <label htmlFor="postalCode">
              Поштовий код
            </label>
            <TextField
                 name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
            </TextField>
          </li>}
          {[WAREHOUSE_WAREHOUSE, WAREHOUSE_DOORS].includes(deliveryType) && <li>
            <button type="button" className="button" onClick={handleCalculateDeliveryPrice}>Розрахувати вартість доставки</button>
          </li>}
          {!!price && <li>
            <label htmlFor="postalCode">
              Вартість доставки {price} грн.
            </label>
          </li>}
          <li>
            <button type="submit" className="button primary" onClick={submitHandler}>Продовжити</button>
          </li>

        </ul>
      </form>
    </div>
  </div>

}
export default ShippingScreen;
