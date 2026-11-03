import Link from "next/link";
import { TOOLS } from "../lib/tools";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">Công cụ tiện ích tiếng Việt</h1>
      <p className="mt-2 text-gray-600">
        Các công cụ nhỏ, miễn phí, chạy ngay trên trình duyệt.
      </p>
      <ul className="mt-8 space-y-3">
        {TOOLS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block rounded-xl border p-4 shadow-sm hover:bg-gray-50"
            >
              <h2 className="text-lg font-semibold">{t.ten}</h2>
              <p className="mt-1 text-sm text-gray-600">{t.moTa}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}