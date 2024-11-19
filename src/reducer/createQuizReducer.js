const initialState = {
    addQuestions: {},
    currentQuestion: null,
    quizEditResponse: [],
    quizzes: [],
    quizList: [],
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
        
        case 'EDIT_QUESTION': {
            const updatedQuestions = state.addQuestions[ action.payload.quizId ]?.map( ( q ) =>
                q.id === action.payload.id ? action.payload : q
            );

            return {
                ...state,
                addQuestions: {
                    ...state.addQuestions,
                    [ action.payload.quizId ]: updatedQuestions,
                },
                currentQuestion: null,
            };
        };
        
        case 'DELETE_QUESTION': {
            const { quizId, questionId } = action.payload;

            if ( !state.addQuestions[ quizId ] )
            {
                console.warn( `Quiz with ID ${quizId} not found.` );
                return state;
            }

            const updatedQuestions = state.addQuestions[ quizId ].filter(
                ( q ) => q.id !== questionId
            );

            return {
                ...state,
                addQuestions: {
                    ...state.addQuestions,
                    [ quizId ]: updatedQuestions,
                },
            };
        };
            
        case 'ADD_QUESTION': {
            const { id, question } = action.payload;

            const existingQuizQuestions = state.addQuestions[ id ] || [];

            const updatedQuestions = existingQuizQuestions.filter( ( q ) => q.id !== question.id );
            updatedQuestions.push( question );

            return {
                ...state,
                addQuestions: {
                    ...state.addQuestions,
                    [ id ]: updatedQuestions,
                },
            };
        };
        
        default:
            return state;
    }
}

export { initialState, quizReducer };
