import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import FontAwesome icons

const UserTable = ({
  paginatedUsers,
  togglePermission,
  handleEditUser,
  saveEditedUser,
  deleteUser,
  editingUserId,
  editingUserData,
  setEditingUserData,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="shadow-md rounded-lg bg-white p-4">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Permission</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers && paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => togglePermission(user.id)}
                    className={`py-1 px-2 text-xs rounded ${
                      user.permission === "Granted"
                        ? "bg-green-200"
                        : "bg-red-200"
                    }`}
                  >
                    {user.permission}
                  </button>
                </td>
                <td className="px-4 py-2">
                  {editingUserId === user.id ? (
                    <div>
                      <input
                        type="text"
                        value={editingUserData.name || ""}
                        onChange={(e) =>
                          setEditingUserData({
                            ...editingUserData,
                            name: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1"
                      />
                      <button
                        onClick={saveEditedUser}
                        className="bg-blue-500 text-white rounded px-3 py-1 ml-2"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        <FaEdit /> {/* Edit Icon */}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-500 hover:underline"
                      >
                        <FaTrashAlt /> {/* Delete Icon */}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
