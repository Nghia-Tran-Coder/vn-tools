import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "../../lib/site";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: `Liên hệ ${SITE_NAME} để báo lỗi, góp ý về số liệu hoặc đề xuất công cụ mới.`,
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold sm:text-3xl">Liên hệ</h1>

      <div className="mt-6 space-y-4 leading-relaxed">
        <p>
          Nếu bạn gặp lỗi, thấy số liệu chưa đúng, hoặc muốn đề xuất công cụ mới, hãy gửi email đến:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-blue-600 underline">
            {CONTACT_EMAIL}
          </a>
        </p>

        <h2 className="text-xl font-semibold">Khi gửi email, bạn nên ghi rõ</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Báo lỗi công cụ:</strong> tên công cụ, các số bạn đã nhập, kết quả bạn nhận được và
            kết quả bạn mong đợi.
          </li>
          <li>
            <strong>Báo biểu phí hoặc thuế chưa đúng:</strong> tên sàn, loại phí, mức đúng và đường dẫn
            đến thông báo chính thức nếu có.
          </li>
          <li>
            <strong>Đề xuất công cụ mới:</strong> mô tả ngắn bạn cần tính hoặc chuyển đổi điều gì.
          </li>
        </ul>

        <p className="text-sm text-gray-500">
          Mình đọc các email gửi đến nhưng có thể chưa trả lời ngay. Mình không hỗ trợ tư vấn thuế hoặc
          pháp lý cho từng trường hợp riêng.
        </p>
      </div>
    </main>
  );
}