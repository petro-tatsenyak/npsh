import Axios from "../libs/axios";
import {
    DELIVERY_CITIES, DELIVERY_WAREHOUSES, DELIVERY_PRICE, DELIVERY_STREETS, DELIVERY_FAILS, DELIVERY_LOADING
} from "../constants/deliveryConstants";

const listCities = (city) => async (dispatch) => {
    try {
        dispatch({ type: DELIVERY_LOADING, payload: true })
        const { data } = await Axios.get(`/api/delivery/cities?city=${city}`);

        dispatch({ type: DELIVERY_CITIES, payload: data })
        dispatch({ type: DELIVERY_LOADING, payload: false })
    } catch (error) {
        dispatch({ type: DELIVERY_FAILS, payload: error })
        dispatch({ type: DELIVERY_LOADING, payload: false })
    }
}

const listStreets = (cityRef, street) => async (dispatch) => {
    try {
        dispatch({ type: DELIVERY_LOADING, payload: true })
        const { data } = await Axios.get(`/api/delivery/streets?city=${cityRef}&street=${street}`);

        dispatch({ type: DELIVERY_STREETS, payload: data })
        dispatch({ type: DELIVERY_LOADING, payload: false })
    } catch (error) {
        dispatch({ type: DELIVERY_FAILS, payload: error })
        dispatch({ type: DELIVERY_LOADING, payload: false })
    }
}



const listWarehouses = (city) => async (dispatch) => {
    try {
        dispatch({ type: DELIVERY_LOADING, payload: true })
        const { data } = await Axios.get(`/api/delivery/warehouses?city=${city}`);

        dispatch({ type: DELIVERY_WAREHOUSES, payload: data })
        dispatch({ type: DELIVERY_LOADING, payload: false })
    } catch (error) {
        dispatch({ type: DELIVERY_FAILS, payload: error })
        dispatch({ type: DELIVERY_LOADING, payload: false })
    }
}


const getPrice = ({ cityRef, weight, deliveryType, cost }) => async (dispatch) => {
    try {
        dispatch({ type: DELIVERY_LOADING, payload: true })
        const { data } = await Axios.get(`/api/delivery/price?cityRecipient=${cityRef}&serviceType=${deliveryType}&cost=${cost}&weight=${weight}`);

        dispatch({ type: DELIVERY_PRICE, payload: data[0].cost })
        dispatch({ type: DELIVERY_LOADING, payload: false })
    } catch (error) {
        dispatch({ type: DELIVERY_FAILS, payload: error })
        dispatch({ type: DELIVERY_LOADING, payload: false })
    }
}

export { listCities, listStreets, listWarehouses, getPrice };
