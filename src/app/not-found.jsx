import Link from "next/link";

export const metadata = {
  title: "Page not found | Galleria.",
  description: null,
};

export default function NotFound() {
  return (
    <main className="h-screen -mt-16 flex items-center flex-col justify-center">
      <h1 className="text-7xl font-bold">Page not found</h1>
      <p className="mt-4 mb-6">
        Hmm, the page you were looking for doesn’t seem to exist anymore.
      </p>
      <Link
        href="/"
        className="bg-black text-white px-4 h-11 rounded-md flex items-center hover:bg-gray-900 transition"
      >
        Back to Galleria.
      </Link>
    </main>
  );
}
