const initialState = {
    questions: [],
    currentQuestion: null,
    quizEditResponse: [],
    quizzes: [],
    quizList:[],
};


function quizReducer ( state, action )
{
    switch (action.type) {
        case 'SET_CURRENT_QUESTION':
            return { ...state, currentQuestion: action.payload };
        case 'SET_QUIZ_INFO':
            return { ...state, quizEditResponse: action.payload };
        case 'SET_ALL_QUIZ':
            return { ...state, quizzes: action.payload };
        case 'SET_QUIZ_LIST':
            return { ...state, quizList: action.payload };
        case 'EDIT_QUESTION':
            return {
                ...state,
                questions: state.questions.map((q) =>
                    q.id === action.payload.id ? action.payload : q
                ),
                currentQuestion: null,
            };
        case 'DELETE_QUESTION':
            return {
                ...state,
                questions: state.questions.filter((q) => q.id !== action.payload),
            };
        case 'ADD_QUESTION':
            return {
                ...state,
                questions: [...state.questions, action.payload],
            };
        default:
            return state;
    }
}

export { initialState, quizReducer };
