import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import QuizCardForm from "../components/admin/QuizCardForm";

export default function AddQuizCardPage() {
    const navigate = useNavigate();

  return (
    <HelmetProvider>
      <Helmet>
        <title>Add quiz Card</title>
      </Helmet>
      <div className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8 fixed">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <button onClick={ () => navigate( "/dashboard" ) } className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to home
            </button>

            <h2 className="text-3xl font-bold mb-6">Give your quiz title and description</h2>
            <QuizCardForm />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
