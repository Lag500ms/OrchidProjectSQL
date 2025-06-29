import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPassword(null);
    try {
      const res = await fetch("http://localhost:8080/api/accounts/forget-password?email=" + encodeURIComponent(email));
      if (res.ok) {
        const data = await res.json();
        setPassword(data.password);
      } else {
        const text = await res.text();
        setError(text || "Email not found.");
      }
    } catch (e) {
      setError("Error.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Take password</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-xl hover:bg-blue-700"
          >
            Take password
          </button>
        </form>
        {password && (
          <div className="mt-4 text-green-600">
            Your password: <span className="font-bold">{password}</span>
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
