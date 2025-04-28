// ProgressCard.jsx
export default function ProgressCard({ name, role, progress }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-500 capitalize">{role}</p>
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 mt-1">{progress}% Complete</p>
      </div>
    </div>
  );
}
