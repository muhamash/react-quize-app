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
        case 'EDIT_QUESTION':
            return {
                ...state,
                addQuestions: state.questions.map((q) =>
                    q.id === action.payload.id ? action.payload : q
                ),
                currentQuestion: null,
            };
        case 'DELETE_QUESTION':
            return {
                ...state,
                questions: state.questions.filter((q) => q.id !== action.payload),
            };
        case 'ADD_QUESTION': {
            const { id, question } = action.payload;

            // Retrieve existing questions for the quiz
            const existingQuizQuestions = state.addQuestions[ id ] || [];

            // Check for duplicate question by ID
            const isDuplicate = existingQuizQuestions.some(
                ( q ) => q.id === question.id
            );

            if ( isDuplicate )
            {
                return state; // Do nothing if the question already exists
            }

            // Append the new question to the existing array
            return {
                ...state,
                addQuestions: {
                    ...state.addQuestions,
                    [ id ]: [ ...existingQuizQuestions, question ],
                },
            };
        };
        
        default:
            return state;
    }
}

export { initialState, quizReducer };
