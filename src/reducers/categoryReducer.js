import {
    CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL,
    CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_DETAILS_FAIL,
    CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL,
} from "../constants/categoryConstants";


function categoryCreateReducer(state = {}, action) {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return { loading: true };
        case CATEGORY_CREATE_SUCCESS:
            return { loading: false, category: action.payload, success: true };
        case CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}


function categoryDetailsReducer(state = {
    category: {}
}, action) {
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return { loading: true };
        case CATEGORY_DETAILS_SUCCESS:
            return { loading: false, category: action.payload };
        case CATEGORY_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

function categoryListReducer(state = {
    categories: []
}, action) {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

export {
    categoryCreateReducer,
    categoryDetailsReducer,
    categoryListReducer,
}
