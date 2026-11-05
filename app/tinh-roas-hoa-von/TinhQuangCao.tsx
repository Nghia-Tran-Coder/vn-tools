"use client";
import { useState } from "react";
import Link from "next/link";
import Truong from "../../components/Truong";
import { docPhanTram, docTien, phanTram, soThapPhan, tien } from "../../lib/dinhdang";
import { tinhLaiThucTe, tinhQuangCao, type KetQuaQuangCao } from "../../lib/quangcao";

const THONG_BAO_LOI: Record<string, string> = {
  PHI_TU_100: "Tổng phần trăm phí phải nhỏ hơn 100%.",
  GIA_BAN_KHONG_HOP_LE: "Giá bán phải lớn hơn 0.",
  SO_KHONG_HOP_LE: "Vui lòng nhập số không âm (chi tiêu quảng cáo phải lớn hơn 0).",
  TY_LE_HOAN_KHONG_HOP_LE: "Tỷ lệ đơn hoàn phải từ 0% đến dưới 100%.",
};

function Dong({ ten, giaTri }: { ten: string; giaTri: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-blue-100 pb-1">
      <dt>{ten}</dt>
      <dd className="font-medium">{giaTri}</dd>
    </div>
  );
}

export default function TinhQuangCao() {
  const [cheDo, setCheDo] = useState<"hoaVon" | "thucTe">("hoaVon");
  const [giaBan, setGiaBan] = useState("");
  const [giaNhap, setGiaNhap] = useState("");
  const [chiPhiDon, setChiPhiDon] = useState("");
  const [phiTong, setPhiTong] = useState("");
  const [loiMucTieu, setLoiMucTieu] = useState("");
  const [chiTieuQC, setChiTieuQC] = useState("");
  const [doanhThuQC, setDoanhThuQC] = useState("");
  const [tyLeHoan, setTyLeHoan] = useState("");

  const gb = docTien(giaBan);
  const mucTieu = docTien(loiMucTieu);
  const hoan = docPhanTram(tyLeHoan);
  const dauVao = {
    giaNhap: docTien(giaNhap),
    chiPhiMoiDon: docTien(chiPhiDon),
    phiPhanTram: docPhanTram(phiTong),
  };

  const coDuLieu =
    giaBan.trim() !== "" &&
    giaNhap.trim() !== "" &&
    (cheDo === "hoaVon" || (chiTieuQC.trim() !== "" && doanhThuQC.trim() !== ""));

  let hoaVon: KetQuaQuangCao | null = null;
  let thucTe: ReturnType<typeof tinhLaiThucTe> | null = null;
  let loi = "";

  if (coDuLieu) {
    const cacSo = [gb, mucTieu, hoan, dauVao.giaNhap, dauVao.chiPhiMoiDon, dauVao.phiPhanTram];
    if (cacSo.some((x) => Number.isNaN(x))) {
      loi = "Vui lòng chỉ nhập chữ số (ô phần trăm có thể dùng dấu phẩy, ví dụ 23,5).";
    } else {
      try {
        hoaVon = tinhQuangCao(gb, dauVao, mucTieu, hoan);
        if (cheDo === "thucTe") {
          const ct = docTien(chiTieuQC);
          const dt = docTien(doanhThuQC);
          if (Number.isNaN(ct) || Number.isNaN(dt)) throw new Error("SO_KHONG_HOP_LE");
          thucTe = tinhLaiThucTe(gb, dauVao, ct, dt, hoan);
        }
      } catch (e) {
        const ma = e instanceof Error ? e.message : "";
        loi = THONG_BAO_LOI[ma] ?? "Không tính được, vui lòng kiểm tra lại các số đã nhập.";
        hoaVon = null;
        thucTe = null;
      }
    }
  }

  const nutChon = (dangChon: boolean) =>
    `min-h-11 flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
      dangChon ? "border-blue-600 bg-blue-600 text-white" : "hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="mt-6 space-y-6 rounded-xl border p-4 shadow-sm sm:p-6">
      <section>
        <h2 className="text-base font-semibold">1. Thông tin sản phẩm</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Truong id="gia-ban" nhan="Giá bán" giaTri={giaBan} onChange={setGiaBan} donVi="đ" />
          <Truong id="gia-nhap" nhan="Giá nhập / giá vốn" giaTri={giaNhap} onChange={setGiaNhap} donVi="đ" />
          <Truong
            id="chi-phi-don"
            nhan="Chi phí cố định mỗi đơn"
            goiY="Đóng gói, phí tính theo đơn, vận chuyển bạn chịu..."
            giaTri={chiPhiDon}
            onChange={setChiPhiDon}
            donVi="đ"
          />
          <Truong
            id="phi-tong"
            nhan="Tổng các loại phí theo % giá bán"
            goiY="Cộng phí cố định, giao dịch, dịch vụ, thuế..."
            giaTri={phiTong}
            onChange={setPhiTong}
            donVi="%"
            kieu="decimal"
          />
          <Truong
            id="ty-le-hoan"
            nhan="Tỷ lệ đơn hoàn / hủy (không bắt buộc)"
            goiY="Ví dụ 10 nghĩa là 10% đơn đặt bị hoàn hoặc hủy. Để trống nếu chưa biết."
            giaTri={tyLeHoan}
            onChange={setTyLeHoan}
            donVi="%"
            kieu="decimal"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Chưa biết điền phí thế nào? Xem{" "}
          <Link href="/tinh-loi-nhuan-ban-hang" className="underline">
            công cụ tính lợi nhuận
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold">2. Bạn muốn làm gì?</h2>
        <div className="mt-3 flex gap-2" role="group" aria-label="Chế độ tính">
          <button type="button" aria-pressed={cheDo === "hoaVon"} onClick={() => setCheDo("hoaVon")} className={nutChon(cheDo === "hoaVon")}>
            Tìm ROAS hòa vốn
          </button>
          <button type="button" aria-pressed={cheDo === "thucTe"} onClick={() => setCheDo("thucTe")} className={nutChon(cheDo === "thucTe")}>
            Kiểm tra quảng cáo đang chạy
          </button>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {cheDo === "hoaVon" ? (
            <Truong
              id="loi-muc-tieu"
              nhan="Lãi mong muốn mỗi đơn sau quảng cáo"
              goiY="Không bắt buộc. Để trống nếu chỉ cần biết mức hòa vốn."
              giaTri={loiMucTieu}
              onChange={setLoiMucTieu}
              donVi="đ"
            />
          ) : (
            <>
              <Truong id="chi-tieu" nhan="Tổng chi phí quảng cáo" giaTri={chiTieuQC} onChange={setChiTieuQC} donVi="đ" />
              <Truong id="doanh-thu" nhan="Doanh thu từ quảng cáo" giaTri={doanhThuQC} onChange={setDoanhThuQC} donVi="đ" />
            </>
          )}
        </div>
      </section>

      {loi && <p className="text-sm text-red-600">{loi}</p>}

      {cheDo === "hoaVon" && hoaVon && (
        <section className="rounded-lg bg-blue-50 p-4 text-gray-900" aria-live="polite">
          {hoaVon.roasHoaVon === null ? (
            <p className="text-sm">
              Với các chi phí này, mỗi đơn chưa có lãi ngay cả trước khi chạy quảng cáo (lãi mỗi đơn:{" "}
              <strong>{tien(hoaVon.loiTruocQC)}</strong>), nên chạy quảng cáo chỉ làm lỗ thêm. Hãy tăng
              giá bán hoặc giảm chi phí. Bạn có thể dùng{" "}
              <Link href="/tinh-loi-nhuan-ban-hang" className="underline">
                công cụ tính lợi nhuận
              </Link>{" "}
              để tìm giá bán phù hợp.
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-600">ROAS hòa vốn</p>
              <p className="text-3xl font-bold">{soThapPhan(hoaVon.roasHoaVon)}</p>
              <p className="mt-1 text-sm">
                Mỗi 1 đồng chi cho quảng cáo cần thu về ít nhất {soThapPhan(hoaVon.roasHoaVon)} đồng
                doanh thu để không lỗ.
              </p>
              <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <Dong ten="ACOS tối đa" giaTri={phanTram(hoaVon.acosToiDa)} />
                <Dong ten="Chi phí quảng cáo tối đa mỗi đơn" giaTri={tien(hoaVon.cpaToiDa)} />
                <Dong ten="Lãi mỗi đơn trước quảng cáo" giaTri={tien(hoaVon.loiTruocQC)} />
                <Dong ten="Biên lãi trước quảng cáo" giaTri={phanTram(hoaVon.bienTruocQC)} />
                {mucTieu > 0 && (
                  <Dong
                    ten={`ROAS cần để còn lãi ${tien(mucTieu)}`}
                    giaTri={hoaVon.roasMucTieu === null ? "Không đạt được" : soThapPhan(hoaVon.roasMucTieu)}
                  />
                )}
              </dl>
            </>
          )}
        </section>
      )}

      {cheDo === "thucTe" && thucTe && hoaVon && (
        <section className="rounded-lg bg-blue-50 p-4 text-gray-900" aria-live="polite">
          <p className="text-sm text-gray-600">Lãi sau khi trừ quảng cáo</p>
          <p className={`text-3xl font-bold ${thucTe.loiSauQC < 0 ? "text-red-600" : "text-green-700"}`}>
            {tien(thucTe.loiSauQC)}
          </p>
          <p className="mt-1 text-sm">
            {thucTe.loiSauQC < 0
              ? hoaVon.roasHoaVon === null
                ? "Mỗi đơn chưa có lãi trước quảng cáo nên quảng cáo chỉ làm lỗ thêm."
                : "Quảng cáo này đang lỗ vì ROAS thực tế thấp hơn ROAS hòa vốn."
              : "Quảng cáo này không bị lỗ."}
          </p>
          <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <Dong ten="ROAS thực tế" giaTri={soThapPhan(thucTe.roasThucTe)} />
            <Dong
              ten="ROAS hòa vốn"
              giaTri={hoaVon.roasHoaVon === null ? "Không có" : soThapPhan(hoaVon.roasHoaVon)}
            />
            <Dong ten="Số đơn ước tính" giaTri={soThapPhan(thucTe.soDon)} />
            <Dong ten="Lãi mỗi đơn trước quảng cáo" giaTri={tien(hoaVon.loiTruocQC)} />
          </dl>
        </section>
      )}
    </div>
  );
}