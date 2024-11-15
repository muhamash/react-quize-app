 
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCreateQuiz from "../../hooks/useCreateQuiz";
import { usePatchData } from "../../hooks/usePatchData";
import { usePostData } from "../../hooks/usePostData";

const QuizCardForm = ( { onClose } ) =>
{
  const { dispatch, state } = useCreateQuiz();
  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      title: state?.quizList?.title || "",
      description: state?.quizList?.description || "" ,
    },
  });

  const navigate = useNavigate();

  const onSuccess = ( response ) =>
  {
    console.log( response );
    dispatch({ type: "SET_QUIZ_LIST", payload: response.data });
    navigate( "/createQuiz" );
    onClose();
  };

  const onError = (error) => {
    alert(`Something went wrong: ${error.message}. Please try again!`);
  };

  const quizCardPatch = usePatchData( {
    url: `http://localhost:5000/api/admin/quizzes/${state?.quizList?.id}`,
    onSuccess,
    onError,
  } );

  const quizCardMutation = usePostData( {
    url: `http://localhost:5000/api/admin/quizzes`,
    onSuccess,
    onError,
  } );

  const onSubmit = ( data ) =>
  {
    if ( state?.quizList?.id )
    {
      quizCardPatch.mutate( {
        title: data.title,
        description: data.description,
        status: state?.quizList?.status,
      } );
    }
    else
    {
      quizCardMutation.mutate( {
        title: data.title,
        description: data.description,
      } );
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm p-3">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <p
          className="text-right text-red-700 font-bold cursor-pointer"
          onClick={onClose}
        >
          Close
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Quiz Title Field */}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter quiz title"
              {...register("title", {
                required: "Quiz title is required",
                validate: (value) => value.trim().length > 0 || "Quiz title cannot be empty",
              })}
            />
            {errors.title && <p className="text-red-600">{errors.title.message}</p>}
          </div>

          {/* Quiz Description Field */}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter quiz description"
              {...register("description", {
                required: "Quiz description is required",
                validate: (value) => value.trim().length > 0 || "Invalid description",
              })}
            />
            {errors.description && <p className="text-red-600">{errors.description.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={quizCardMutation.isLoading}
          >
            {quizCardMutation.isPending || quizCardPatch.isPending ? "Submitting..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizCardForm;