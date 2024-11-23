/* eslint-disable react/prop-types */
import ProgressBar from "@ramonak/react-progress-bar";

export default function QuizCounter({ user, quizData, questionIndex }) {
  // Compute the completed value as a percentage.
  const totalQuestions = quizData?.questions?.length || 0;
  const completedValue =
    totalQuestions > 1
      ? ((questionIndex + 1) / totalQuestions) * 100
      : 100;

    const customLabel = `${totalQuestions - questionIndex - 1 ? `${totalQuestions - questionIndex - 1} more!` : "almost there!!!"}`
    
    return (
        <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
            <div>
                <h2 className="text-4xl font-bold mb-4">{ quizData.title }</h2>
                <p className="text-gray-600 mb-4">{ quizData.description }</p>

                <div className="flex flex-col">
                    <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                        Total number of questions: { quizData.stats.total_questions }
                    </div>

                    <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                        Total marks: { quizData.stats.total_marks }
                    </div>

                    { totalQuestions > 1 && (
                        <ProgressBar
                            bgColor="green"
                            className="py-1"
                            labelSize="10px"
                            baseBgColor="violet"
                            customLabel={customLabel}
                            completed={ completedValue }
                        />
                    ) }

                    <div className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                        Total number of attempts: { quizData.stats.total_attempts }
                    </div>
                </div>
            </div>

            <div className="mt-auto flex items-center">
                <img
                    src="./assets/avater.webp"
                    alt="Mr Hasan"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <span className="text-black font-semibold">{ user }</span>
            </div>
        </div>
    );
}