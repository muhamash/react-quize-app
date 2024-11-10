const actionTypes = {
    SET_QUIZZES: 'SET_QUIZZES',
    SET_SINGLE_QUIZ: 'SET_SINGLE_QUIZ',
};

const initialState = {
    quizzes: [],
    singleQuiz: null,
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_QUIZZES:
            return { ...state, quizzes: action.payload };
        case actionTypes.SET_SINGLE_QUIZ:
            return { ...state, singleQuiz: action.payload };
        default:
            return state;
    }
};

export { initialState, quizReducer };