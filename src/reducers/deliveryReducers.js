import { DELIVERY_STREETS, DELIVERY_CITIES, DELIVERY_PRICE, DELIVERY_WAREHOUSES, DELIVERY_FAILS, DELIVERY_LOADING, DELIVERY_ORDER_NUMBER } from "../constants/deliveryConstants";

function deliveryReducer(state = { cities: [], streets: [], warehouses: [], price: 0 }, action) {
    switch (action.type) {
        case DELIVERY_CITIES:
            return { ...state, cities: action.payload };
        case DELIVERY_STREETS:
            return { ...state, streets: action.payload };
        case DELIVERY_PRICE:
            return { ...state, price: action.payload };
        case DELIVERY_WAREHOUSES:
            return { ...state, warehouses: action.payload };
        case DELIVERY_ORDER_NUMBER:
            return { ...state, orderNumber: action.payload };
        case DELIVERY_FAILS:
            return { ...state, error: action.payload };
        case DELIVERY_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state
    }
}

export { deliveryReducer }
