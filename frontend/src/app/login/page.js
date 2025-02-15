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
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-64">
        <input type="email" placeholder="Email" {...register("email")} className="border p-2 rounded" />
        <input type="password" placeholder="Contraseña" {...register("password")} className="border p-2 rounded" />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">Ingresar</button>
      </form>
    </main>
  );
}
