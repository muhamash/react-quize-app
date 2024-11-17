const initialState = {
    addQuestions: {},
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
                currentQuestion: null, // Reset current question
            };
        };
        
        case 'DELETE_QUESTION': {
            const { quizId, questionId } = action.payload;

            // Ensure the quiz exists in addQuestions
            if ( !state.addQuestions[ quizId ] )
            {
                console.warn( `Quiz with ID ${quizId} not found.` );
                return state;
            }

            // Filter out the question to be deleted
            const updatedQuestions = state.addQuestions[ quizId ].filter(
                ( q ) => q.id !== questionId
            );

            // Update the state with the modified questions
            return {
                ...state,
                addQuestions: {
                    ...state.addQuestions,
                    [ quizId ]: updatedQuestions, // Update the specific quiz's questions
                },
            };
        };
            
        case 'ADD_QUESTION': {
            const { id, question } = action.payload;

            //  questions for the quiz
            const existingQuizQuestions = state.addQuestions[ id ] || [];

            // Replace the old question if it exists, or append the new one if not
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
