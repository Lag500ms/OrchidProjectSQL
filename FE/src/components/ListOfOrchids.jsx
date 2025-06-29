import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// ================= MODAL ADD ORCHID ==================
function AddOrchidModal({ open, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [orchidUrl, setOrchidUrl] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isNatural, setIsNatural] = useState(true);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const category = [
    { id: 1, name: "Cattleya Alliance" },
    { id: 2, name: "Dendrobium" },
    { id: 3, name: "Miltoniopsis" },
    { id: 4, name: "Neofinetia" },
    { id: 5, name: "Oncidiinae" },
    { id: 6, name: "Paphiopedilum" },
    { id: 7, name: "Phalaenopsis" },
    { id: 8, name: "Phragmipedium" },
    { id: 9, name: "Other Orchids" },
  ];

  useEffect(() => {
    if (open) {
      setName(""); setDescription(""); setOrchidUrl(""); setPrice("");
      setCategoryId(""); setIsNatural(true); setMsg("");
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const token = localStorage.getItem("token");
    console.log("Token FE gửi lên là:", token);
    try {
      const res = await fetch("http://localhost:8080/api/orchids/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          isNatural,
          description,
          name,
          orchidUrl,
          price: parseFloat(price),
          categoryId: Number(categoryId),
        }),
      });
      if (res.ok) {
        setMsg("Add orchid success!");
        onCreated(); // reload list
        onClose();
      } else {
        const text = await res.text();
        setMsg(text || "Fail!");
      }
    } catch {
      setMsg("Error!");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black"
        >&times;</button>
        <h2 className="text-xl font-bold mb-4">Add orchid</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-xl"
            placeholder="Name orchid"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <textarea
            className="w-full border px-3 py-2 rounded-xl"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-xl"
            placeholder="Picture (URL)"
            value={orchidUrl}
            onChange={e => setOrchidUrl(e.target.value)}
            required
          />
          <input
            type="number"
            className="w-full border px-3 py-2 rounded-xl"
            placeholder="Giá"
            value={price}
            onChange={e => setPrice(e.target.value)}
            min="0"
            required
          />
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={isNatural}
                onChange={() => setIsNatural(true)}
              />
              Natural
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!isNatural}
                onChange={() => setIsNatural(false)}
              />
              Industry
            </label>
          </div>
          <select
            className="w-full border px-3 py-2 rounded-xl"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            required
          >
            <option value="">-- Category --</option>
            {category.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {msg && <div className="text-red-500 text-sm">{msg}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-2 rounded-xl hover:bg-green-700"
          >
            {loading ? "Đang thêm..." : "Thêm Orchid"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ================== MAIN COMPONENT ====================
export default function ListOfOrchids() {
  const baseUrl = "http://localhost:8080/api/orchids";
  const [orchids, setOrchids] = useState([]);
  const [page, setPage] = useState(0);
  const [keywords, setKeywords] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchOrchids();
    // eslint-disable-next-line
  }, [page, keywords]);

  const fetchOrchids = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}?page=${page}&size=6&keywords=${encodeURIComponent(keywords)}`);
      const data = await res.json();
      setOrchids(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch {
      alert("Failed to fetch orchids!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchOrchids();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this orchid?")) return;
    const token = localStorage.getItem("token");
    try {
      await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      fetchOrchids();
      alert("Deleted successfully!");
    } catch {
      alert("Failed to delete!");
    }
  };


  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            placeholder="Search orchids..."
            className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Search
          </button>
        </form>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Orchid
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading orchids...</div>
      ) : orchids.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No orchids found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-sm font-medium">Image</th>
                <th className="border p-3 text-sm font-medium">Name</th>
                <th className="border p-3 text-sm font-medium">Type</th>
                <th className="border p-3 text-sm font-medium">Category</th>
                <th className="border p-3 text-sm font-medium">Price</th>
                <th className="border p-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orchids.map((orchid) => (
                <tr key={orchid.id} className="hover:bg-gray-50 transition">
                  <td className="border p-3">
                    <img src={orchid.imageUrl} alt={orchid.name} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="border p-3">{orchid.name}</td>
                  <td className="border p-3">{orchid.isNatural ? "Natural" : "Industrial"}</td>
                  <td className="border p-3">{orchid.categoryName}</td>
                  <td className="border p-3">${orchid.price}</td>
                  <td className="border p-3 flex gap-3">
                    <Link
                      to={`/edit/${orchid.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(orchid.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded border ${p === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'
                }`}
            >
              {p + 1}
            </button>
          ))}
        </div>
      )}

      {/* MODAL ADD ORCHID */}
      <AddOrchidModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreated={fetchOrchids}
      />
    </div>
  );
}
