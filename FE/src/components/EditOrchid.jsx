import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CATEGORIES = [
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

export default function EditOrchid() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orchid, setOrchid] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch orchid by id
  useEffect(() => {
    const fetchOrchid = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/orchids/detail/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setOrchid(data);
      } catch (e) {
        setMsg("Orchid not found!");
      } finally {
        setLoading(false);
      }
    };
    fetchOrchid();
  }, [id]);

  // Handle edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const token = localStorage.getItem("token");
    try {
      // Map frontend fields to backend DTO
      const categoryObj = CATEGORIES.find(
        c => c.name === orchid.categoryName || c.id === orchid.categoryId
      );
      const updateBody = {
        isNatural: orchid.isNatural,
        description: orchid.description,
        name: orchid.name,
        orchidUrl: orchid.imageUrl, // FE field is imageUrl, BE expects orchidUrl
        price: orchid.price,
        category: {
          id: categoryObj ? categoryObj.id : null,
          name: categoryObj ? categoryObj.name : orchid.categoryName
        }
      };
      const res = await fetch(`http://localhost:8080/api/orchids/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(updateBody)
      });
      if (res.ok) {
        setMsg("Update successful!");
        setTimeout(() => navigate(-1), 1000);
      } else {
        const text = await res.text();
        setMsg(text || "Update failed!");
      }
    } catch {
      setMsg("Error updating orchid!");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!orchid) return <div className="p-8 text-center text-red-500">{msg}</div>;

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Orchid</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-xl"
          placeholder="Name"
          value={orchid.name}
          onChange={e => setOrchid({ ...orchid, name: e.target.value })}
          required
        />
        <textarea
          className="w-full border px-3 py-2 rounded-xl"
          placeholder="Description"
          value={orchid.description}
          onChange={e => setOrchid({ ...orchid, description: e.target.value })}
          required
        />
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-xl"
          placeholder="Image URL"
          value={orchid.imageUrl}
          onChange={e => setOrchid({ ...orchid, imageUrl: e.target.value })}
          required
        />
        <input
          type="number"
          className="w-full border px-3 py-2 rounded-xl"
          placeholder="Price"
          value={orchid.price}
          onChange={e => setOrchid({ ...orchid, price: e.target.value })}
          min="0"
          required
        />
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={orchid.isNatural}
              onChange={() => setOrchid({ ...orchid, isNatural: true })}
            />
            Natural
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={!orchid.isNatural}
              onChange={() => setOrchid({ ...orchid, isNatural: false })}
            />
            Industrial
          </label>
        </div>
        <select
          className="w-full border px-3 py-2 rounded-xl"
          value={
            CATEGORIES.find(c => c.name === orchid.categoryName)?.id ||
            CATEGORIES.find(c => c.id === orchid.categoryId)?.id ||
            ""
          }
          onChange={e => {
            const c = CATEGORIES.find(cat => cat.id === Number(e.target.value));
            setOrchid({
              ...orchid,
              categoryName: c?.name,
              categoryId: c?.id
            });
          }}
          required
        >
          <option value="">-- Category --</option>
          {CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {msg && <div className="text-red-500 text-sm">{msg}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-xl hover:bg-blue-700"
        >
          Update Orchid
        </button>
      </form>
    </div>
  );
}
