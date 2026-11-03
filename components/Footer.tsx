import Link from "next/link";
import { NAM_BAN_QUYEN, SITE_NAME, TRANG_THONG_TIN } from "../lib/site";
import { TOOLS } from "../lib/tools";

export default function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-8 text-sm sm:grid-cols-3">
        <div>
          <p className="font-semibold">{SITE_NAME}</p>
          <p className="mt-2 text-gray-500">
            Công cụ tiện ích tiếng Việt, miễn phí, chạy ngay trên trình duyệt.
          </p>
        </div>
        <nav aria-label="Công cụ">
          <p className="font-semibold">Công cụ</p>
          <ul className="mt-2 space-y-1">
            {TOOLS.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="hover:underline">
                  {t.ten}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Thông tin">
          <p className="font-semibold">Thông tin</p>
          <ul className="mt-2 space-y-1">
            {TRANG_THONG_TIN.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="hover:underline">
                  {t.ten}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="border-t px-4 py-4 text-center text-xs text-gray-500">
        © {NAM_BAN_QUYEN} {SITE_NAME}. Kết quả từ các công cụ mang tính tham khảo.
      </p>
    </footer>
  );
}