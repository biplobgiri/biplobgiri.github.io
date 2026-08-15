import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center text-slate-900">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">404</p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight">Page not found</h1>
      <Link href="/" className="mt-6 text-sm font-medium underline underline-offset-4">
        Back to home
      </Link>
    </main>
  );
}
