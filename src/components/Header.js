import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-brand-purple text-pink p-4 shadow-md rounded-b-xl">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          SafetyU 💖
        </Link>
        <div className="space-x-4 text-sm">
          <Link href="/" className="hover:text-brand-pink transition">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-brand-pink transition">
            Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
}
