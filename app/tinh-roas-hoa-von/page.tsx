import type { Metadata } from "next";
import Link from "next/link";
import Bang from "../../components/Bang";
import TinhQuangCao from "./TinhQuangCao";
import GopY from "../../components/GopY";

export const metadata: Metadata = {
  title: "Tính ROAS hòa vốn, ACOS và chi phí quảng cáo tối đa",
  description:
    "Công cụ miễn phí tính ROAS hòa vốn, ACOS tối đa và chi phí quảng cáo tối đa cho mỗi đơn khi bán hàng trên Shopee, TikTok Shop, Lazada. Không cần đăng nhập.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold sm:text-3xl">Công cụ tính ROAS hòa vốn</h1>
      <p className="mt-2 text-gray-600">
        Biết bạn được chi bao nhiêu cho quảng cáo mà không bị lỗ: tính ROAS hòa vốn, ACOS tối đa và chi
        phí quảng cáo tối đa cho mỗi đơn. Dùng được cho Shopee, TikTok Shop, Lazada và các kênh khác.
        Không cần đăng nhập, số liệu bạn nhập không bị gửi đi đâu.
      </p>

      <TinhQuangCao />

      <article className="mt-12 space-y-5 leading-relaxed">
        <h2 className="text-xl font-semibold">ROAS là gì?</h2>
        <p>
          ROAS (Return On Ad Spend) cho biết mỗi 1 đồng chi cho quảng cáo mang về bao nhiêu đồng doanh
          thu. Công thức: ROAS = doanh thu từ quảng cáo ÷ chi phí quảng cáo. Ví dụ chi 1.000.000 đ cho
          quảng cáo và thu về 4.000.000 đ doanh thu thì ROAS là 4.
        </p>

        <h2 className="text-xl font-semibold">Vì sao ROAS cao chưa chắc có lãi?</h2>
        <p>
          ROAS tính trên doanh thu, không phải trên lãi. Sau khi trừ giá vốn, phí sàn, thuế và chi phí
          đơn hàng, mỗi đơn chỉ còn lại một phần của giá bán. Vì vậy mỗi sản phẩm có một mức ROAS hòa vốn
          riêng: dưới mức đó quảng cáo đang làm bạn lỗ, trên mức đó mới bắt đầu có lãi.
        </p>

        <h2 className="text-xl font-semibold">Các công thức công cụ sử dụng</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Lãi mỗi đơn trước quảng cáo = giá bán − phí theo % − giá nhập − chi phí cố định mỗi đơn</li>
          <li>ROAS hòa vốn = giá bán ÷ lãi mỗi đơn trước quảng cáo</li>
          <li>ACOS tối đa = lãi mỗi đơn trước quảng cáo ÷ giá bán, tính theo phần trăm</li>
          <li>Chi phí quảng cáo tối đa mỗi đơn = lãi mỗi đơn trước quảng cáo</li>
          <li>ROAS cần đạt để còn lãi mong muốn = giá bán ÷ (lãi mỗi đơn trước quảng cáo − lãi mong muốn)</li>
        </ul>

        <h2 className="text-xl font-semibold">Các thuật ngữ thường gặp</h2>
        <Bang
          dau={["Thuật ngữ", "Ý nghĩa", "Công thức"]}
          hang={[
            ["ROAS", "Doanh thu thu về trên mỗi đồng quảng cáo", "Doanh thu quảng cáo ÷ chi phí quảng cáo"],
            ["ACOS", "Phần trăm doanh thu bạn chi cho quảng cáo", "Chi phí quảng cáo ÷ doanh thu quảng cáo (bằng 1 chia ROAS)"],
            ["CPA", "Chi phí quảng cáo cho mỗi đơn hàng", "Chi phí quảng cáo ÷ số đơn"],
            ["ROI", "Lãi trên mỗi đồng bỏ ra", "Lãi ÷ chi phí bỏ ra"],
          ]}
        />

        <h2 className="text-xl font-semibold">Ví dụ minh họa</h2>
        <p>
          Đây là ví dụ với số giả định, không phải biểu phí thật. Sản phẩm bán 200.000 đ, giá nhập
          100.000 đ, chi phí cố định mỗi đơn 8.000 đ, tổng phí theo phần trăm 23%. Lãi mỗi đơn trước
          quảng cáo là 200.000 − 46.000 − 100.000 − 8.000 = 46.000 đ, tức 23% giá bán.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>ROAS hòa vốn = 200.000 ÷ 46.000 = khoảng 4,35</li>
          <li>ACOS tối đa = 23%</li>
          <li>Chi phí quảng cáo tối đa mỗi đơn = 46.000 đ</li>
          <li>Muốn còn lãi 10.000 đ mỗi đơn sau quảng cáo thì cần ROAS khoảng 5,56</li>
        </ul>
        <p>
          Nếu bạn chi 5.000.000 đ quảng cáo và thu về 20.000.000 đ doanh thu thì ROAS là 4. Đó là khoảng
          100 đơn, lãi trước quảng cáo 4.600.000 đ, trừ quảng cáo còn âm 400.000 đ. ROAS 4 nghe có vẻ
          tốt nhưng vẫn thấp hơn mức hòa vốn 4,35 nên đang lỗ.
        </p>

        <h2 className="text-xl font-semibold">Cách điền ô tổng phí theo %</h2>
        <p>
          Cộng các loại phí tính theo phần trăm giá bán: phí cố định hoặc hoa hồng ngành hàng, phí giao
          dịch, phí dịch vụ, thuế nếu có. Cách tìm từng loại phí trên Shopee và TikTok Shop có trong bài
          của công cụ{" "}
          <Link href="/tinh-loi-nhuan-ban-hang" className="underline">
            tính lợi nhuận bán hàng online
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold">Đơn hoàn và đơn hủy ảnh hưởng thế nào?</h2>
        <p>
          Tùy cách tính của từng sàn, doanh thu trong báo cáo quảng cáo có thể được tính trên đơn đặt, trong
          khi bạn chỉ có lãi trên đơn giao thành công. Nếu 10% đơn bị hoàn hoặc hủy, lãi bình quân trên mỗi
          đơn đặt giảm đi 10%, nên ROAS hòa vốn tăng lên. Với ví dụ ở trên, ROAS hòa vốn tăng từ khoảng 4,35
          lên khoảng 4,83. Hãy nhập tỷ lệ hoàn hoặc hủy của bạn vào công cụ để tính sát thực tế hơn.
        </p>

        <h2 className="text-xl font-semibold">Giới hạn của công cụ</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Công cụ coi mọi đơn từ quảng cáo có cùng mức lãi mỗi đơn.</li>
          <li>
            Đơn hoàn và hủy được tính qua ô tỷ lệ hoàn, với giả định chúng không tạo doanh thu và không phát
            sinh thêm chi phí. Nếu bạn mất thêm phí vận chuyển hoặc hàng hỏng khi hoàn hàng, hãy cộng ước tính
            khoản đó vào chi phí cố định mỗi đơn.
          </li>
          <li>
            Mỗi nền tảng có thể tính doanh thu quảng cáo theo cách riêng (ví dụ có hoặc không tính giảm
            giá, phí vận chuyển). Hãy xem định nghĩa trong báo cáo quảng cáo của sàn.
          </li>
          <li>Kết quả mang tính ước tính, không thay thế tư vấn tài chính.</li>
        </ul>

        <h2 className="text-xl font-semibold">Câu hỏi thường gặp</h2>

        <h3 className="font-semibold">ROAS bao nhiêu là tốt?</h3>
        <p>
          Không có con số chung. Mức tốt phụ thuộc vào biên lãi của từng sản phẩm. Hãy so sánh ROAS thực
          tế của bạn với ROAS hòa vốn tính ở trên.
        </p>

        <h3 className="font-semibold">ROAS khác ROI ở chỗ nào?</h3>
        <p>
          ROAS tính trên doanh thu, còn ROI tính trên lãi. Vì vậy một quảng cáo có ROAS tốt vẫn có thể có
          ROI âm nếu biên lãi của sản phẩm mỏng.
        </p>

        <h3 className="font-semibold">ACOS và ROAS liên quan thế nào?</h3>
        <p>
          ACOS là nghịch đảo của ROAS. ROAS 4 tương ứng ACOS 25%, ROAS 5 tương ứng ACOS 20%.
        </p>

        <h3 className="font-semibold">Số liệu tôi nhập có bị gửi đi đâu không?</h3>
        <p>Không. Việc tính toán diễn ra ngay trên trình duyệt của bạn.</p>
      </article>
      <GopY tenCongCu="tính ROAS hòa vốn" />
    </main>
  );
}