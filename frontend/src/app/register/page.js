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
      // Opcional: redirige al login tras un tiempo
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Error al registrar usuario");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-64">
        <input
          type="text"
          placeholder="Nombre"
          {...register("name")}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password")}
          className="border p-2 rounded"
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          Registrarse
        </button>
      </form>
    </main>
  );
}
