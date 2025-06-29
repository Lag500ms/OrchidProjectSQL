import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!username || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload = {
      name: username,
      email,
      password,
    };

    try {
      const res = await fetch("http://localhost:8080/api/accounts/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Register failed");
      }

      const loginRes = await fetch("http://localhost:8080/api/accounts/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!loginRes.ok) {
        throw new Error("Auto login failed");
      }

      const data = await loginRes.json();
      localStorage.setItem("token", data.token);

      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none ${
                error && formData.password !== formData.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-2 focus:ring-red-400"
              }`}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none ${
                error && formData.password !== formData.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-2 focus:ring-red-400"
              }`}
              required
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
