// Table.jsx
import { useState } from "react";

const Table = ({
  columns,
  data,
  darkMode,
  pagination = true,
  actions = [],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pagination
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : data;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  return (
    <div
      className={`overflow-hidden rounded-lg border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {column.header}
              </th>
            ))}
            {actions.length > 0 && (
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody
          className={`divide-y ${
            darkMode
              ? "divide-gray-700 bg-gray-900"
              : "divide-gray-200 bg-white"
          }`}
        >
          {currentItems.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex % 2 === 0
                  ? darkMode
                    ? "bg-gray-800"
                    : "bg-white"
                  : darkMode
                  ? "bg-gray-900"
                  : "bg-gray-50"
              }
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? "text-gray-200" : "text-gray-500"
                  }`}
                >
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => action.onClick(row)}
                        className={`${
                          action.className ||
                          `text-sm ${
                            darkMode
                              ? "text-blue-400 hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-900"
                          }`
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && totalPages > 1 && (
        <div
          className={`px-4 py-3 flex items-center justify-between border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex-1 flex justify-between">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? darkMode
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? darkMode
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
