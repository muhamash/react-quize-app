const actionTypes = {
    SET_QUIZZES: 'SET_QUIZZES',
    GET_ATTEMPT_ID: 'GET_ATTEMPT_ID',
    GET_QUIZ_ANSWERS: 'GET_QUIZ_ANSWERS',
    GET_QUIZ_ANSWERS_SERVER: 'GET_QUIZ_ANSWERS_SERVER'
};

const initialState = {
    quizzes: [],
    quizAnswers: [],
    quizAttempts: [],
    quizAnswerServer: [],
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_QUIZZES:
            return { ...state, quizzes: action.payload };

        case actionTypes.GET_ATTEMPT_ID: {
            const { quizId, attemptId } = action.payload;

            // Add new quizId: attemptId pair to the array
            return {
                ...state,
                quizAttempts: [
                    ...state.quizAttempts,
                    { [quizId]: attemptId }
                ]
            };
        }

        case actionTypes.GET_QUIZ_ANSWERS:
            return { ...state, quizAnswers: action.payload };

        case actionTypes.GET_QUIZ_ANSWERS_SERVER:
            return { ...state, quizAnswerServer: action.payload };

        default:
            return state;
    }
};

export { initialState, quizReducer };
