import { useState } from "react";
import { loginApi } from "../../services/auth.api";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await loginApi(form);
    login(data);

    navigate("/app");
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded-xl w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-brand">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg text-black"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg text-black"
          onChange={handleChange}
        />

        <button className="w-full bg-brand text-white py-2 rounded-lg hover:bg-brand-dark">
          Login
        </button>

        <p className="text-center text-sm text-black">
          New here? <a href="/register" className="text-brand underline">Create Account</a>
        </p>
      </form>
    </div>
  );
}
