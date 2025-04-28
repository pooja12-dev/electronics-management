import { useState } from "react";

export default function TeamDataPage() {
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Project Manager",
      email: "john@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Developer",
      email: "jane@example.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "Designer",
      email: "michael@example.com",
      status: "Inactive",
    },
  ]);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
    status: "Active",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addOrEditMember = () => {
    if (editingId === null) {
      setTeam([...team, { ...newMember, id: Date.now() }]);
    } else {
      const updatedTeam = team.map((member) =>
        member.id === editingId ? { ...newMember, id: editingId } : member
      );
      setTeam(updatedTeam);
    }
    setNewMember({
      name: "",
      role: "",
      email: "",
      status: "Active",
    });
    setIsModalOpen(false);
    setEditingId(null);
  };

  const deleteMember = (id) => {
    const updatedTeam = team.filter((member) => member.id !== id);
    setTeam(updatedTeam);
  };

  const openModal = (id = null) => {
    if (id !== null) {
      const memberToEdit = team.find((member) => member.id === id);
      setNewMember(memberToEdit);
      setEditingId(id);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Team Data</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New Member
        </button>
      </header>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member) => (
              <tr key={member.id}>
                <td className="py-2 px-4">{member.name}</td>
                <td className="py-2 px-4">{member.role}</td>
                <td className="py-2 px-4">{member.email}</td>
                <td className="py-2 px-4">
                  <span
                    className={`${
                      member.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => openModal(member.id)}
                    className="text-yellow-500 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMember(member.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl mb-4">
              {editingId ? "Edit Member" : "Add New Member"}
            </h2>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={newMember.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="role">
                Role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={newMember.role}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={newMember.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={newMember.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addOrEditMember}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {editingId ? "Update" : "Add"} Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
