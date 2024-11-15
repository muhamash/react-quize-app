import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const QuizCardForm = ( { onClose } ) =>
{
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = ( data ) =>
  {
    console.log( data );
    
    navigate( '/createQuiz' );
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm p-3">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <p
          className="text-right text-red-700 font-bold cursor-pointer"
          onClick={ onClose }
        >
          Close
        </p>
        <form onSubmit={ handleSubmit( onSubmit ) }>
          {/* Quiz Title Field */ }
          <div className="mb-4">
            <label
              htmlFor="quiz-title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quiz Title
            </label>
            <input
              type="text"
              id="quiz-title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
              placeholder="Enter quiz title"
              { ...register( "title", {
                required: "Quiz title is required",
                validate: ( value ) => value.trim().length > 0 || "Quiz title cannot be empty",
              } ) }
            />
            { errors.title && (
              <p className="text-red-600">{ errors.title.message }</p>
            ) }
          </div>

          {/* Quiz Description Field */ }
          <div className="mb-6">
            <label
              htmlFor="quiz-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="quiz-description"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
              placeholder="Enter quiz description"
              { ...register( "description", {
                required: "Quiz description is required",
                validate: ( value ) => value.trim().length > 0 || value.trim().length > 0 || "Invalid description",
              } ) }
            />
            { errors.description && (
              <p className="text-red-600">{ errors.description.message }</p>
            ) }
          </div>

          {/* Submit Button */ }
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizCardForm;