import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username, 
          password: password,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Đăng nhập thất bại");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token); 
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Sign in to your account
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username input */}
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-blue-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-medium">Password</label>
                <a href="/forgot-password" className="text-sm text-red-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Sign In
            </button>
          </form>

          {error && (
            <p className="text-center mt-4 text-red-500 text-sm">{error}</p>
          )}

          <p className="text-center mt-6 text-sm">
            Need an account?{" "}
            <a href="/register" className="text-red-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
