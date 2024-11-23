import useAuth from "../../hooks/useAuth";

/* eslint-disable react/prop-types */
export default function RightCard({ user, totalMarks, isTopFive }) {
  const { auth } = useAuth();

  const isCurrentUser = user.id === auth.user.id;

  return (
    <li
      className={`flex items-center justify-between p-2 rounded-lg ${
        isCurrentUser && isTopFive
          ? 'bg-violet-500' 
          : isTopFive
          ? 'bg-green-500'
          : ''
      }`}
    >
      <div className="flex items-center">
        <img src="./assets/bg.jpg" alt="SPD Smith" className="object-cover w-10 h-10 rounded-full mr-4" />
        <div>
          <h3 className="font-semibold text-black">{user.full_name}</h3>
          <p className="text-sm text-gray-800">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-2 text-slate-700">{totalMarks}</span>
      </div>
    </li>
  );
}