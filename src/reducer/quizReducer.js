const actionTypes = {
    SET_QUIZZES: 'SET_QUIZZES',
    GET_ATTEMPT_ID: 'GET_ATTEMPT_ID',
    GET_QUIZ_ANSWERS: 'GET_QUIZ_ANSWERS',
    GET_QUIZ_ANSWERS_SERVER: 'GET_QUIZ_ANSWERS_SERVER',
    GET_SINGLE_QUIZ: "GET_SINGLE_QUIZ",
    GET_SUBMIT_INFO: "GET_SUBMIT_INFO",
};

const initialState = {
    quizzes: [],
    quizAnswers: [],
    quizAttempts: [],
    quizAnswerServer: [],
    singleQuiz: [],
    submissionInfo: [],
};

const quizReducer = ( state, action ) =>
{
    switch ( action.type )
    {
        case actionTypes.SET_QUIZZES:
            return { ...state, quizzes: action.payload };
        case actionTypes.GET_SINGLE_QUIZ: {
            const { userId, singleQuizId } = action.payload;
            return {
                ...state, singleQuiz: {
                    ...state.singleQuiz,
                    [ userId ]: singleQuizId
                }
            };
        }
        
        case actionTypes.GET_SUBMIT_INFO: {
            const { userId, quizId, submissionInformation } = action.payload;

            return {
                ...state,
                submissionInfo: {
                    ...state.submissionInfo, 
                    [ userId ]: {
                        ...state.submissionInfo[ userId ],
                        [ quizId ]: submissionInformation,
                    },
                },
            };
        };
            
        case actionTypes.GET_ATTEMPT_ID: {
            const { userId, quizId, attemptId } = action.payload;
            return {
                ...state,
                quizAttempts: {
                    ...state.quizAttempts,
                    [ userId ]: {
                        ...state.quizAttempts[ userId ],
                        [ quizId ]: attemptId,
                    },
                },
            };
        };
            
        case actionTypes.GET_QUIZ_ANSWERS: {
            const { userId, quizId, quizAnswersData } = action.payload;

            return {
                ...state,
                quizAnswers: {
                    ...state.quizAnswers,
                    [ userId ]: {
                        ...state.quizAnswers[ userId ],
                        [ quizId ]: quizAnswersData, 
                    },
                },
            };
        };
            
        case actionTypes.GET_QUIZ_ANSWERS_SERVER: {
            const { userId, quizId, quizAnswerServerData } = action.payload;

            return {
                ...state,
                quizAnswerServer: {
                    ...state.quizAnswerServer,
                    [ userId ]: {
                        ...state.quizAnswerServer[ userId ],
                        [ quizId ]: quizAnswerServerData,  
                    },
                },
            };
        };
            
        default:
            return state;
    }
};

export { initialState, quizReducer };
