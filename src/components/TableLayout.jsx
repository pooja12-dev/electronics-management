import React from "react";

const TableLayout = ({ headers, columns, data }) => {
  // Check if data is provided and is an array
  if (!data || !Array.isArray(data)) {
    console.log("No data available or data is not an array");
    return <p>No data available</p>; // Or any other fallback
  }

  console.log("Rendering TableLayout");
  console.log("Headers:", headers);
  console.log("Columns:", columns);
  console.log("Data:", data);

  return (
    <div className="shadow-md rounded-lg bg-white p-4">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLayout;
