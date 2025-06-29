import React, { useEffect, useState } from "react";

// Modal component
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-black"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default function ListOfEmployees() {
  const baseUrl = "http://localhost:8080/api/accounts";
  const [employees, setEmployees] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roleName: "",
  });

  // Fetch employees (admin only)
  const fetchEmployees = async () => {
    setLoading(true);
    setMsg("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(baseUrl + "?size=100", {
        headers: {
          "Authorization": "Bearer " + token,
        },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setEmployees(data.content || []);
    } catch (err) {
      setMsg("Failed to load employees");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle add new
  const handleAdd = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(baseUrl + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setShowAdd(false);
      setForm({ name: "", email: "", password: "", roleName: "" });
      fetchEmployees();
      setMsg("Employee added!");
    } catch (err) {
      setMsg("Add failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token,
        },
      });
      if (!res.ok) throw new Error(await res.text());
      fetchEmployees();
      setMsg("Deleted successfully!");
    } catch (err) {
      setMsg("Delete failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee List</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
        >
          + Add New Employee
        </button>
      </div>
      {msg && (
        <div className="mb-4 text-center text-sm text-red-500">{msg}</div>
      )}
      {loading ? (
        <div className="py-8 text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto shadow rounded-xl bg-white">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.roleName}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Employee Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)}>
        <h2 className="text-lg font-bold mb-3">Add Employee</h2>
        <form className="space-y-4" onSubmit={handleAdd}>
          <input
            className="w-full border p-2 rounded-xl"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            className="w-full border p-2 rounded-xl"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
          <input
            className="w-full border p-2 rounded-xl"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            required
          />
          <select
            className="w-full border p-2 rounded-xl"
            value={form.roleName}
            onChange={(e) =>
              setForm((f) => ({ ...f, roleName: e.target.value }))
            }
            required
          >
            <option value="">-- Select Role --</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="bg-gray-200 px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
