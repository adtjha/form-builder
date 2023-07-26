// This reducer handles the state related to questions

// Action Types
const ADD_QUESTION = 'ADD_QUESTION';
const UPDATE_QUESTION = 'UPDATE_QUESTION';
const DELETE_QUESTION = 'DELETE_QUESTION';

// Initial State
const initialState = {
    questions: [],
};

// Reducer
const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload],
            };
        case UPDATE_QUESTION:
            return {
                ...state,
                questions: state.questions.map((question) =>
                    question._id === action.payload._id ? action.payload : question
                ),
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter((question) => question._id !== action.payload),
            };
        default:
            return state;
    }
};

export default questionReducer;
