import type { Metadata } from "next";
import Link from "next/link";
import { OWNER_NAME, SITE_NAME } from "../../lib/site";
import { TOOLS } from "../../lib/tools";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: `Giới thiệu về ${SITE_NAME}: bộ công cụ tiện ích tiếng Việt miễn phí, không cần đăng nhập, chạy ngay trên trình duyệt.`,
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold sm:text-3xl">Giới thiệu về {SITE_NAME}</h1>

      <div className="mt-6 space-y-4 leading-relaxed">
        <p>
          {SITE_NAME} là bộ công cụ nhỏ bằng tiếng Việt, dùng ngay trên trình duyệt, không cần đăng ký
          hay đăng nhập. Trang do {OWNER_NAME} xây dựng và duy trì.
        </p>

        <h2 className="text-xl font-semibold">Các công cụ hiện có</h2>
        <ul className="list-disc space-y-2 pl-5">
          {TOOLS.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="font-medium underline">
                {t.ten}
              </Link>
              : {t.moTa}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold">Nguyên tắc làm việc</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Miễn phí và không cần đăng nhập.</li>
          <li>
            Số liệu bạn nhập được xử lý ngay trên trình duyệt của bạn, không gửi về máy chủ của chúng tôi.
          </li>
          <li>
            Với các công cụ liên quan đến biểu phí và thuế, mỗi trang ghi rõ ngày rà soát lần cuối. Các
            sàn thương mại điện tử thay đổi chính sách thường xuyên nên mình sẽ rà lại định kỳ.
          </li>
          <li>
            Kết quả mang tính tham khảo, không thay thế tư vấn tài chính, thuế hay pháp lý.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">Quảng cáo và liên kết tiếp thị</h2>
        <p>
          Hiện website chưa hiển thị quảng cáo. Nếu sau này có quảng cáo hoặc liên kết tiếp thị, mình sẽ
          ghi rõ và cập nhật{" "}
          <Link href="/chinh-sach-bao-mat" className="underline">
            Chính sách bảo mật
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold">Góp ý</h2>
        <p>
          Bạn gặp lỗi, thấy số liệu chưa đúng hoặc muốn đề xuất công cụ mới? Hãy xem trang{" "}
          <Link href="/lien-he" className="underline">
            Liên hệ
          </Link>
          .
        </p>
      </div>
    </main>
  );
}