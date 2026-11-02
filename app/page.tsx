import Link from "next/link";

const TOOLS = [
  {
    href: "/doc-so-thanh-chu",
    ten: "Đọc số thành chữ",
    moTa: "Đổi số tiền sang chữ tiếng Việt để ghi vào hóa đơn, hợp đồng, phiếu thu chi.",
  },
];

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
              <span className="text-lg font-semibold">{t.ten}</span>
              <span className="mt-1 block text-sm text-gray-600">{t.moTa}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}