import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] gap-8 p-4 sm:p-8 md:p-16 bg-gradient-to-r from-[#f5f5dc] to-[#faf7f0] font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="w-full text-center">
        <h1 className="text-3xl font-bold">Bienvenid@ a Todo List</h1>
      </header>

      <main className="flex flex-col items-center justify-center gap-8">
        <div className="w-full max-w-xl flex flex-col gap-8 items-center text-center">
          {/* Imagen centrada */}
          <Image
            className="mx-auto"
            src="/lmagelog.png"
            alt="Logo"
            width={180}
            height={40}
            priority
          />
          <ol className="list-inside list-decimal text-sm font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Cada tarea completada,{" "}
              <code className="bg-black/5 px-1 py-0.5 rounded font-semibold">
                es un paso hacia el éxito.
              </code>
            </li>
            <li>
              Las ideas más brillantes pueden perderse en el olvido si no las anotamos.
            </li>
          </ol>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="rounded-full border transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Registrate
            </a>
            <a
              className="rounded-full border transition-colors flex items-center justify-center hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-[180px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tu siguiente tarea es...
            </a>
          </div>
        </div>
      </main>

      <footer className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
