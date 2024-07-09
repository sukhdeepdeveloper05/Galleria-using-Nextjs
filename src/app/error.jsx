"use client";

export default function error({ error }) {
  return (
    <main className="h-screen -mt-16 flex items-center flex-col justify-center">
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </main>
  );
}
