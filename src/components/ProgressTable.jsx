// ProgressTable.jsx
export default function ProgressTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Role</th>
            <th className="py-3 px-6">Progress</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.id} className="border-t">
              <td className="py-3 px-6">{employee.name}</td>
              <td className="py-3 px-6 capitalize">{employee.role}</td>
              <td className="py-3 px-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${employee.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1">{employee.progress}%</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
