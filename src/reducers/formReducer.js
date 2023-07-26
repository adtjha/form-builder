// This reducer handles the state related to forms

// Action Types
const ADD_FORM = 'ADD_FORM';
const UPDATE_FORM = 'UPDATE_FORM';
const DELETE_FORM = 'DELETE_FORM';

// Initial State
const initialState = {
    forms: [],
};

// Reducer
const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FORM:
            return {
                ...state,
                forms: [...state.forms, action.payload],
            };
        case UPDATE_FORM:
            return {
                ...state,
                forms: state.forms.map((form) =>
                    form._id === action.payload._id ? action.payload : form
                ),
            };
        case DELETE_FORM:
            return {
                ...state,
                forms: state.forms.filter((form) => form._id !== action.payload),
            };
        default:
            return state;
    }
};

export default formReducer;
