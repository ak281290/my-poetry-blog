import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/login", form);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/poems");
    } catch {
      setError("Invalid username or password");
    }
  };

  const handleSignupClick = () => {
    sessionStorage.setItem("allowSignup", "yes");
    navigate("/signup");
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        {error && <div className="text-red-600">{error}</div>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <span>Don't have an account? </span>
        <button
          className="text-blue-600 underline"
          onClick={handleSignupClick}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}