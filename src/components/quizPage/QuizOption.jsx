/* eslint-disable react/prop-types */
export function QuizOption({ option, isSelected, onChange }) {
  return (
    <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg cursor-pointer">
      <input
        type="checkbox"
        name="answer"
        checked={isSelected}
        onChange={onChange}
        className="form-checkbox text-buzzr-purple"
      />
      <span>{option}</span>
    </label>
  );
}