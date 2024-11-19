const actionTypes = {
    SET_QUIZZES: 'SET_QUIZZES',
    GET_ATTEMPT_ID: 'GET_ATTEMPT_ID',
    GET_QUIZ_ANSWERS: 'GET_QUIZ_ANSWERS',
    GET_QUIZ_ANSWERS_SERVER: 'GET_QUIZ_ANSWERS_SERVER',
    GET_LEADER_DATA: "GET_LEADER_DATA",
    GET_SINGLE_QUIZ: "GET_SINGLE_QUIZ",
    GET_SUBMIT_INFO: "GET_SUBMIT_INFO",
};

const initialState = {
    quizzes: [],
    quizAnswers: [],
    quizAttempts: [],
    quizAnswerServer: [],
    leaderBoard: [],
    singleQuiz: [],
    submissionInfo: [],
    userInfo:[]
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_QUIZZES:
            return { ...state, quizzes: action.payload };
        case actionTypes.GET_SINGLE_QUIZ:
            return { ...state, singleQuiz: action.payload };
        case actionTypes.GET_SUBMIT_INFO: {
            const { quizId, submissionInformation } = action.payload;
            return {
                ...state,
                submissionInfo: [
                    ...state.submissionInfo,
                    { [ quizId ]: submissionInformation }
                ]
            };
        }
        case actionTypes.GET_ATTEMPT_ID: {
            const { quizId, attemptId } = action.payload;
            return {
                ...state,
                quizAttempts: [
                    ...state.quizAttempts,
                    { [quizId]: attemptId }
                ]
            };
        }
        case actionTypes.GET_QUIZ_ANSWERS: {
            const { quizId, quizAnswersData } = action.payload;
            return {
                ...state,
                quizAnswers: [
                    ...state.quizAnswers,
                    { [ quizId ]: quizAnswersData }
                ]
            };
        };
        case actionTypes.GET_QUIZ_ANSWERS_SERVER: {
            const { quizId, quizAnswerServerData } = action.payload;
            return {
                ...state,
                quizAnswerServer: [
                    ...state.quizAnswerServer,
                    { [ quizId ]: quizAnswerServerData }
                ]
            };
        };
        default:
            return state;
    }
};

export { initialState, quizReducer };
