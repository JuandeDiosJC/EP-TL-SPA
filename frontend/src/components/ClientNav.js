"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ClientNav() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="p-4 bg-gray-200 flex items-center gap-4">
      <Link href="/login">Login</Link>
      <Link href="/register">Registro</Link>
      <Link href="/tasks">Tareas</Link>
      <button
        onClick={handleLogout}
        className="ml-auto bg-red-500 text-white px-3 py-1 rounded"
      >
        Exit
      </button>
    </nav>
  );
}