// import React from 'react';
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom'; 

const QuizCardForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
//   const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data); 

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="quiz-title" className="block text-sm font-medium text-gray-700 mb-1">Quiz title</label>
        <input
          type="text"
          id="quiz-title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Quiz"
          {...register("quizTitle", { required: "Quiz title is required" })}
        />
        {errors.quizTitle && <p className="text-red-600">{errors.quizTitle.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="quiz-description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
        <textarea
          id="quiz-description"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Description"
          {...register("quizDescription")}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Next
      </button>
    </form>
  );
};

export default QuizCardForm;