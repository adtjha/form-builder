// This reducer handles the state related to forms

// Action Types
const ADD_FORM = 'ADD_FORM';
const UPDATE_FORM = 'UPDATE_FORM';
const DELETE_FORM = 'DELETE_FORM';

// Initial State
const initialState = {
    forms: {
        id: "",
        name: "",
        created: false
    }
};

// Reducer
const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FORM:
            return {
                forms: {
                    id: action.payload.id,
                    name: action.payload.name,
                    created: true
                }
            }
        case UPDATE_FORM:
            return {
                forms: {
                    id: action.payload.id,
                    name: action.payload.name,
                    created: true,
                }
            };
        case DELETE_FORM:
            return {
                forms: {
                    id: "",
                    name: "",
                    created: false,
                }
            };
        default:
            return state;
    }
};

export default formReducer;
