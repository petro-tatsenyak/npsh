import Axios from "axios";
import {
    CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL,
    CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL,
} from "../constants/categoryConstants";

const createCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_CREATE_REQUEST, payload: category });

        const {userSignin: {userInfo}} = getState();

        if (!category._id) {
            const {data: {data: newCategory}} = await Axios.post("/api/categories", category, {
                headers: {
                    Authorization: ' Bearer ' + userInfo.token
                }
            });
            dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: newCategory });
        }
        else {
            const {data: {data: updated }} = await Axios.patch(`/api/categories/${category._id}`, category, {
                headers: {
                    Authorization: ' Bearer ' + userInfo.token
                }
            });
            dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: updated });
        }
    } catch (error) {
        dispatch({ type: CATEGORY_CREATE_FAIL, payload: error.response.data.message });
    }
}

const listCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });
        const { data } = await Axios.get("/api/categories");

        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
    }
}

export { createCategory, listCategories };
