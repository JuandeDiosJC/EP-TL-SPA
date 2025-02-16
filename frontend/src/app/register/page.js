"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "../../services/api";

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (formData) => {
    try {
      const response = await registerUser(formData.name, formData.email, formData.password);
      setSuccess(response.msg);
      // Redirige al login después de 2 segundos
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Error al registrar usuario");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            {...register("name")}
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          {success && <p className="text-green-500 text-center">{success}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
          >
            Registrarse
          </button>
        </form>
      </div>
    </main>
  );
}
