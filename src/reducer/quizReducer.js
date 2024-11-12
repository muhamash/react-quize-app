const actionTypes = {
    SET_QUIZZES: 'SET_QUIZZES',
    GET_SINGLE_QUIZ: 'GET_SINGLE_QUIZ',
    GET_QUIZ_ANSWERS: "GET_QUIZ_ANSWERS",
    GET_QUIZ_ANSWERS_SERVER: "GET_QUIZ_ANSWERS_SERVER"
};

const initialState = {
    quizzes: [],
    quizAnswers: [],
    singleQuiz:[],
    quizAnswerServer:[]
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_QUIZZES:
            return { ...state, quizzes: action.payload };
        case actionTypes.GET_SINGLE_QUIZ:
            return { ...state, singleQuiz: action.payload };
        case actionTypes.GET_QUIZ_ANSWERS:
            return { ...state, quizAnswers: action.payload };
        case actionTypes.GET_QUIZ_ANSWERS_SERVER:
            return { ...state, quizAnswerServer: action.payload };
        default:
            return state;
    }
};

export { initialState, quizReducer };
