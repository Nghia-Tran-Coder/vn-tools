import type { Metadata } from "next";
import TinhLoiNhuan from "./TinhLoiNhuan";
import GopY from "../../components/GopY";

export const metadata: Metadata = {
  title: "Tính lợi nhuận & giá bán Shopee, TikTok Shop, Lazada",
  description:
    "Công cụ miễn phí tính giá bán cần đặt và lợi nhuận còn lại sau phí sàn, thuế, chi phí đơn hàng. Bạn tự nhập tỷ lệ phí nên luôn đúng khi sàn đổi biểu phí.",
};

// Cập nhật ngày này mỗi khi bạn rà soát lại số liệu phí trong bài
const NGAY_CAP_NHAT = "03/11/2026";

function Bang({ dau, hang }: { dau: string[]; hang: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border text-left text-sm">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            {dau.map((d) => (
              <th key={d} className="border px-3 py-2">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hang.map((h) => (
            <tr key={h[0]}>
              {h.map((o, i) => (
                <td key={i} className="border px-3 py-2 align-top">{o}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold sm:text-3xl">Công cụ tính lợi nhuận bán hàng online</h1>
      <p className="mt-2 text-gray-600">
        Tính giá bán cần đặt, hoặc lợi nhuận còn lại sau khi trừ phí sàn, thuế và chi phí đơn hàng.
        Dùng được cho Shopee, TikTok Shop, Lazada và cả khi bán qua Zalo, Facebook. Không cần đăng nhập,
        số liệu bạn nhập không bị gửi đi đâu.
      </p>

      <TinhLoiNhuan />

      <article className="mt-12 space-y-5 leading-relaxed">
        <p className="text-sm text-gray-500">
          Thông tin về biểu phí trong bài mang tính tham khảo, rà soát lần cuối ngày {NGAY_CAP_NHAT}.
          Các sàn thay đổi phí nhiều lần trong năm 2026, vì vậy hãy luôn đối chiếu với biểu phí chính thức
          trong Kênh Người Bán trước khi quyết định giá.
        </p>

        <h2 className="text-xl font-semibold">Cách dùng công cụ</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Nhập <strong>giá nhập</strong> và các <strong>chi phí cố định mỗi đơn</strong> (đóng gói, phí tính theo đơn, vận chuyển bạn chịu).</li>
          <li>Nhập các loại phí tính theo phần trăm: phí cố định theo ngành hàng, phí giao dịch, phí dịch vụ hoặc affiliate, thuế nếu có. Công cụ tự cộng tổng.</li>
          <li>Chọn <strong>Tìm giá bán cần đặt</strong> nếu bạn biết lãi mong muốn, hoặc <strong>Tính lãi từ giá bán</strong> nếu bạn đã có giá và muốn biết còn lại bao nhiêu.</li>
        </ol>

        <h2 className="text-xl font-semibold">Công thức tính</h2>
        <p>
          Các loại phí theo phần trăm được tính trên giá bán, nên không thể chỉ cộng thêm một khoản lãi
          cố định vào giá nhập rồi cộng phần trăm phí. Công cụ dùng hai công thức sau:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Giá bán cần đặt = (giá nhập + chi phí mỗi đơn + lãi mong muốn) ÷ (1 − tổng phí %)
          </li>
          <li>
            Lợi nhuận = giá bán − (giá bán × tổng phí %) − giá nhập − chi phí mỗi đơn
          </li>
        </ul>
        <p>
          Khi tìm giá bán, kết quả luôn được làm tròn lên để lãi thực tế không thấp hơn mục tiêu.
        </p>

        <h2 className="text-xl font-semibold">Ví dụ minh họa</h2>
        <p>
          Đây là ví dụ với số giả định, không phải biểu phí thật. Giá nhập 100.000 đ. Chi phí mỗi đơn
          8.000 đ (đóng gói và các khoản tính theo đơn). Phí cố định 10%, phí giao dịch 6%, phí dịch vụ
          5,5%, thuế 1,5%, tổng 23%. Bạn muốn lãi 20.000 đ mỗi sản phẩm.
        </p>
        <p>
          Giá bán = (100.000 + 8.000 + 20.000) ÷ (1 − 0,23) = khoảng 166.234 đ, làm tròn lên hàng nghìn
          là 167.000 đ. Với giá này, phí theo % là 38.410 đ và lãi thực tế là 20.590 đ, tức khoảng 12,3%
          giá bán. Chỉ cần bạn giảm giá bán 10.000 đ để cạnh tranh là lãi còn thấp hơn nhiều, vì phí
          vẫn tính trên phần giá còn lại nhưng giá vốn thì không giảm.
        </p>

        <h2 className="text-xl font-semibold">Khoản phí nào điền vào đâu?</h2>
        <p>
          Quy tắc đơn giản: khoản phí tính theo phần trăm thì điền vào ô phần trăm, khoản phí là số tiền
          cố định cho mỗi đơn thì cộng vào ô “Chi phí cố định mỗi đơn”.
        </p>

        <h3 className="text-lg font-semibold">Shopee</h3>
        <Bang
          dau={["Loại phí", "Cách tính", "Điền vào ô"]}
          hang={[
            ["Phí cố định", "Phần trăm giá trị sản phẩm, khác nhau theo ngành hàng và loại gian hàng (shop thường hoặc Mall). Biểu phí được cập nhật nhiều lần trong năm 2026.", "Phần trăm"],
            ["Phí xử lý giao dịch", "Phần trăm. Trước đây gọi là phí thanh toán, đổi tên từ 24/04/2026. Từ 01/05/2026 mức phổ biến được ghi nhận là 6%, áp dụng cho mọi phương thức thanh toán kể cả COD.", "Phần trăm"],
            ["Phí hạ tầng", "Số tiền cố định mỗi đơn, mức được ghi nhận khoảng 3.000 đ.", "Chi phí mỗi đơn"],
            ["Voucher Xtra (tùy chọn)", "Phần trăm giá trị mỗi sản phẩm, có mức tối đa trên mỗi sản phẩm. Thông báo của Shopee ghi mức tăng từ 4% lên 5,5% kể từ 23/05/2026.", "Phần trăm (phí dịch vụ)"],
            ["PiShip và vận chuyển", "Số tiền mỗi đơn nếu bạn tham gia hoặc chịu phí vận chuyển. Mức PiShip đã tăng trong năm 2026.", "Chi phí mỗi đơn"],
          ]}
        />

        <h3 className="text-lg font-semibold">TikTok Shop</h3>
        <Bang
          dau={["Loại phí", "Cách tính", "Điền vào ô"]}
          hang={[
            ["Phí hoa hồng nền tảng", "Phần trăm trên giá sản phẩm sau chiết khấu của người bán, khác nhau theo ngành hàng và loại nhà bán hàng (thường hoặc Mall). Được điều chỉnh từ 09/05/2026; theo báo chí, mức mặc định cao nhất khoảng 12,5% với nhà bán thường và 15,5% với Mall.", "Phần trăm"],
            ["Phí giao dịch", "Phần trăm tổng số tiền khách thanh toán, mức 6% từ 09/05/2026. Với cá nhân, mức này đã bao gồm thuế; doanh nghiệp đã xác minh mã số thuế có thể bị thu chưa gồm thuế.", "Phần trăm"],
            ["Phí xử lý đơn hàng", "Số tiền cố định mỗi đơn, mức cụ thể xem trong Seller Center.", "Chi phí mỗi đơn"],
            ["Hoa hồng affiliate", "Do bạn tự đặt, tính trên giá sản phẩm sau chiết khấu, chỉ phát sinh khi có đơn từ người tiếp thị liên kết.", "Phần trăm (phí dịch vụ)"],
            ["Voucher", "Chỉ voucher do người bán tự tạo mới làm bạn mất chi phí.", "Trừ vào giá bán hoặc chi phí"],
          ]}
        />

        <h3 className="text-lg font-semibold">Lazada, Tiki và kênh khác</h3>
        <p>
          Nguyên lý giống nhau. Mở Kênh Người Bán của sàn, tìm mục biểu phí, ghi lại khoản nào tính theo
          phần trăm và khoản nào là số tiền cố định mỗi đơn, rồi điền như hai bảng trên. Nếu bạn bán qua
          Zalo hoặc Facebook thì chỉ cần điền chi phí thực tế của bạn (phí thanh toán, vận chuyển, quảng cáo).
        </p>

        <h2 className="text-xl font-semibold">Cách tìm biểu phí chính xác</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Shopee:</strong> vào Kênh Người Bán, mục kiến thức dành cho người bán (banhang.shopee.vn),
            tìm thông báo cập nhật phí mới nhất và bảng phí cố định theo ngành hàng của bạn.
          </li>
          <li>
            <strong>TikTok Shop:</strong> vào Seller Center, xem thông báo về phí và biểu phí hoa hồng theo
            ngành hàng. TikTok Shop cũng cho phép xem chi tiết phí của từng đơn hàng trong Seller Center.
          </li>
          <li>
            <strong>Kiểm tra bằng đơn thật:</strong> mở chi tiết một đơn đã hoàn thành, cộng tất cả khoản phí
            đã bị trừ và chia cho giá bán. Đó là tỷ lệ phí thực tế, đáng tin hơn mọi bài viết tổng hợp.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">Về thuế</h2>
        <p>
          Từ ngày 01/07/2025, theo Nghị định 117/2025/NĐ-CP, sàn thương mại điện tử có chức năng thanh
          toán phải khấu trừ và nộp thuế thay cho hộ, cá nhân kinh doanh ngay khi giao dịch thành công.
          Với bán hàng hóa, cá nhân cư trú bị khấu trừ 1% thuế giá trị gia tăng và 0,5% thuế thu nhập
          cá nhân, tổng cộng 1,5% doanh thu. Hoạt động dịch vụ có tỷ lệ khác. Nếu bạn là hộ hoặc cá nhân
          bán hàng hóa trên sàn như vậy, hãy điền 1,5 vào ô “Thuế”. Doanh nghiệp kê khai thuế theo quy
          định riêng, nên tùy trường hợp của bạn mà điền mức phù hợp hoặc để trống. Quy định có thể thay
          đổi, hãy hỏi kế toán hoặc cơ quan thuế nếu bạn chưa chắc.
        </p>

        <h2 className="text-xl font-semibold">Câu hỏi thường gặp</h2>

        <h3 className="font-semibold">Vì sao công cụ không tự điền sẵn phí của sàn?</h3>
        <p>
          Phí của các sàn đã thay đổi nhiều lần trong năm 2026, và các nguồn thông tin thường mâu thuẫn nhau
          ở từng thời điểm. Để bạn luôn tính đúng, công cụ để bạn nhập tỷ lệ phí lấy từ biểu phí chính thức.
        </p>

        <h3 className="font-semibold">Khi có voucher giảm giá của shop thì tính thế nào?</h3>
        <p>
          Cách đơn giản nhất là dùng giá bán sau khi đã trừ voucher làm giá bán dự kiến. Một số loại phí
          được tính trên giá sau chiết khấu, bạn nên xem sàn tính phí trên giá nào trong biểu phí của họ.
        </p>

        <h3 className="font-semibold">Biên lợi nhuận khác lãi ở chỗ nào?</h3>
        <p>
          Lãi là số tiền bạn thu về trên mỗi sản phẩm. Biên lợi nhuận là lãi chia cho giá bán, cho biết
          trong mỗi 100 đồng bán ra bạn giữ lại bao nhiêu đồng.
        </p>

        <h3 className="font-semibold">Kết quả có chính xác tuyệt đối không?</h3>
        <p>
          Đây là công cụ ước tính. Kết quả chính xác đến đâu tùy vào các tỷ lệ phí bạn nhập. Công cụ
          không thay thế tư vấn tài chính hay thuế, và không tính các chi phí như hoàn đơn, đổi trả,
          quảng cáo trừ khi bạn tự cộng vào chi phí mỗi đơn.
        </p>
      </article>
      <GopY tenCongCu="tính lợi nhuận" />
    </main>
  );
}