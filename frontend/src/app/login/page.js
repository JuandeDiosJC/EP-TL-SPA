"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "../../services/api";

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (formData) => {
    try {
      const response = await loginUser(formData.email, formData.password);
      localStorage.setItem("token", response.token);
      router.push("/tasks");
    } catch (err) {
      setError(err.response?.data?.msg || "Error al iniciar sesión");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password")}
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}
