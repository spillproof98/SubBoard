import { useState } from "react";
import { registerApi } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerApi(form);
    navigate("/login");
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded-xl w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-brand">Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-lg text-black"
          onChange={handleChange}
        />

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
          Register
        </button>

        <p className="text-center text-sm text-black">
          Already registered? <a href="/login" className="text-brand underline">Login</a>
        </p>
      </form>
    </div>
  );
}
