import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: `Chính sách bảo mật của ${SITE_NAME}: cách website xử lý dữ liệu bạn nhập và thông tin truy cập.`,
};

// Cập nhật ngày này mỗi khi bạn sửa nội dung chính sách
const NGAY_CAP_NHAT = "03/11/2026";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold sm:text-3xl">Chính sách bảo mật</h1>
      <p className="mt-2 text-sm text-gray-500">Cập nhật lần cuối: {NGAY_CAP_NHAT}</p>

      <div className="mt-6 space-y-4 leading-relaxed">
        <p>
          Chính sách này giải thích cách {SITE_NAME} (website tại {SITE_URL}) xử lý thông tin khi bạn
          truy cập và sử dụng các công cụ.
        </p>

        <h2 className="text-xl font-semibold">1. Dữ liệu bạn nhập vào công cụ</h2>
        <p>
          Các số liệu bạn nhập (ví dụ giá nhập, giá bán, tỷ lệ phí, số tiền cần đọc thành chữ) được xử lý
          hoàn toàn trên trình duyệt của bạn. Chúng tôi không gửi, không lưu trữ và không đọc những dữ
          liệu này.
        </p>

        <h2 className="text-xl font-semibold">2. Thông tin kỹ thuật khi truy cập</h2>
        <p>
          Website chạy trên dịch vụ lưu trữ của bên thứ ba. Nhà cung cấp này có thể ghi nhận nhật ký kỹ
          thuật tiêu chuẩn khi bạn truy cập, như địa chỉ IP, loại trình duyệt, thời gian và trang được
          xem, nhằm vận hành và bảo mật dịch vụ. Chúng tôi không dùng thông tin này để nhận dạng cá nhân
          bạn.
        </p>

        <h2 className="text-xl font-semibold">3. Cookie và thống kê truy cập</h2>
        <p>
          Website sử dụng dịch vụ Cloudflare Web Analytics để biết số lượt xem, trang được xem, nguồn truy
          cập, loại thiết bị và quốc gia ở dạng tổng hợp. Theo mô tả của nhà cung cấp, dịch vụ này không dùng
          cookie để theo dõi người truy cập. Vì nhà cung cấp là công ty nước ngoài nên dữ liệu có thể được xử
          lý bên ngoài Việt Nam. Chúng tôi không dùng dữ liệu này để nhận dạng cá nhân bạn. Ngoài ra, website
          không chủ động đặt cookie để theo dõi hoặc quảng cáo. Nếu sau này website sử dụng quảng cáo, chính
          sách này sẽ được cập nhật và nêu rõ loại cookie được dùng.
        </p>

        <h2 className="text-xl font-semibold">4. Thống kê tìm kiếm</h2>
        <p>
          Chúng tôi dùng Google Search Console để xem thống kê tổng hợp về cách các trang xuất hiện trên
          Google. Dữ liệu này không cho chúng tôi biết danh tính từng người truy cập.
        </p>

        <h2 className="text-xl font-semibold">5. Email liên hệ</h2>
        <p>
          Nếu bạn gửi email cho chúng tôi, địa chỉ email và nội dung thư chỉ được dùng để phản hồi bạn.
          Chúng tôi không chia sẻ cho bên thứ ba, trừ khi pháp luật yêu cầu.
        </p>

        <h2 className="text-xl font-semibold">6. Liên kết đến website khác</h2>
        <p>
          Website có thể chứa liên kết đến trang của bên thứ ba (ví dụ trang chính sách của các sàn
          thương mại điện tử). Các trang đó có chính sách riêng và chúng tôi không chịu trách nhiệm về nội
          dung hay cách họ xử lý dữ liệu.
        </p>
        <p>
          Biểu mẫu góp ý do Google Forms cung cấp. Thông tin bạn điền được gửi đến Google và chủ biểu mẫu, vì vậy xin đừng nhập thông tin cá nhân nhạy cảm.
        </p>

        <h2 className="text-xl font-semibold">7. Thay đổi chính sách</h2>
        <p>
          Chúng tôi có thể cập nhật chính sách này khi website thay đổi. Ngày cập nhật lần cuối được ghi
          ở đầu trang.
        </p>

        <h2 className="text-xl font-semibold">8. Liên hệ</h2>
        <p>
          Nếu có câu hỏi về chính sách này, hãy gửi email đến{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </main>
  );
}