import type { Metadata } from "next";
import DocSo from "./DocSo";

export const metadata: Metadata = {
  title: "Đọc số thành chữ online - Chuyển số tiền sang chữ tiếng Việt",
  description:
    "Công cụ đổi số tiền sang chữ tiếng Việt miễn phí, dùng cho hóa đơn, hợp đồng, phiếu chi. Có nút sao chép.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">Đọc số thành chữ</h1>
      <p className="mt-2 text-gray-600">
        Nhập số tiền, nhận ngay cách đọc bằng chữ tiếng Việt để ghi vào hóa đơn, hợp đồng, phiếu thu chi.
      </p>
      <DocSo />

            <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">Quy tắc đọc số tiền tiếng Việt</h2>
        <p>
          Số tiền được đọc theo từng nhóm ba chữ số, từ trái sang phải, kèm đơn vị nghìn, triệu, tỷ.
          Một số quy tắc dễ đọc sai:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Lẻ</strong> (miền Nam hay nói “linh”): dùng khi hàng chục bằng 0, hàng đơn vị khác 0.
            Ví dụ 105 đọc là “một trăm lẻ năm”.
          </li>
          <li>
            <strong>Mười và mươi</strong>: từ 10 đến 19 đọc “mười”, từ 20 trở lên đọc “mươi”.
            Ví dụ 15 là “mười lăm”, 30 là “ba mươi”.
          </li>
          <li>
            <strong>Mốt</strong>: hàng đơn vị là 1 sau “mươi” thì đọc “mốt”. Ví dụ 21 là “hai mươi mốt”,
            còn 11 vẫn là “mười một”.
          </li>
          <li>
            <strong>Tư</strong>: hàng đơn vị là 4 sau “mươi” thường đọc “tư”, ví dụ 24 là “hai mươi tư”.
            Cũng có người đọc “hai mươi bốn”. Công cụ này dùng “tư”.
          </li>
          <li>
            <strong>Lăm</strong>: hàng đơn vị là 5 sau “mười” hoặc “mươi” đọc “lăm”. Ví dụ 15 là “mười lăm”,
            25 là “hai mươi lăm”.
          </li>
          <li>
            <strong>Nhóm ở giữa</strong>: nhóm nào bằng 0 thì bỏ qua. Nhóm nhỏ hơn 100 mà đứng sau nhóm lớn
            thì đọc “không trăm”. Ví dụ 1.005.000 là “một triệu không trăm lẻ năm nghìn”.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">Ví dụ thường gặp</h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="border px-3 py-2">Số</th>
                <th className="border px-3 py-2">Cách đọc</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-3 py-2">15</td><td className="border px-3 py-2">mười lăm</td></tr>
              <tr><td className="border px-3 py-2">21</td><td className="border px-3 py-2">hai mươi mốt</td></tr>
              <tr><td className="border px-3 py-2">105</td><td className="border px-3 py-2">một trăm lẻ năm</td></tr>
              <tr><td className="border px-3 py-2">1.000</td><td className="border px-3 py-2">một nghìn</td></tr>
              <tr><td className="border px-3 py-2">1.005</td><td className="border px-3 py-2">một nghìn không trăm lẻ năm</td></tr>
              <tr><td className="border px-3 py-2">25.400</td><td className="border px-3 py-2">hai mươi lăm nghìn bốn trăm</td></tr>
              <tr><td className="border px-3 py-2">1.500.000</td><td className="border px-3 py-2">một triệu năm trăm nghìn</td></tr>
              <tr><td className="border px-3 py-2">2.000.000.000</td><td className="border px-3 py-2">hai tỷ</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold">Câu hỏi thường gặp</h2>
        <h3 className="font-medium">Công cụ có đọc được số thập phân không?</h3>
        <p>
          Chưa. Công cụ chỉ đọc số nguyên. Ở Việt Nam dấu phẩy là dấu thập phân còn nhiều nơi khác dùng
          dấu phẩy ngăn cách hàng nghìn, nên nhập nhằng rất dễ ra sai số tiền. Vì vậy công cụ sẽ báo lỗi
          thay vì đoán.
        </p>
        <h3 className="font-medium">Nên đọc “lẻ” hay “linh”?</h3>
        <p>
          Cả hai đều đúng, tùy vùng miền. Mặc định công cụ dùng “lẻ” và “nghìn”,
          bạn tick ô miền Nam để đổi sang “linh” và “ngàn”.
        </p>
        <h3 className="font-medium">Số tiền tôi nhập có bị gửi đi đâu không?</h3>
        <p>
          Không. Việc đọc số được tính ngay trong trình duyệt của bạn, không gửi dữ liệu lên máy chủ.
        </p>
        <h3 className="font-medium">Có dùng trực tiếp trên hóa đơn, hợp đồng được không?</h3>
        <p>
          Công cụ chỉ hỗ trợ đọc số thành chữ. Cách ghi cụ thể trên từng loại chứng từ có thể có quy định
          riêng, bạn nên đối chiếu với kế toán hoặc văn bản hiện hành trước khi dùng.
        </p>
      </section>
    </main>
  );
}