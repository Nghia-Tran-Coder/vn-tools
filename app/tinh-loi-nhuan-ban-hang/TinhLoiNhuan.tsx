"use client";
import { useState } from "react";
import { tinhGiaBan, tinhLoiNhuan, type KetQua } from "../../lib/loinhuan";

const dinhDang = new Intl.NumberFormat("vi-VN");
const tien = (n: number) => `${dinhDang.format(n)} đ`;
const phanTram = (n: number) => `${(Math.round(n * 10) / 10).toString().replace(".", ",")}%`;

// "1.500.000" -> 1500000. Rỗng -> 0. Sai định dạng -> NaN
function docTien(s: string): number {
  const t = s.replace(/[.\s]/g, "");
  if (t === "") return 0;
  return /^\d+$/.test(t) ? Number(t) : NaN;
}

// "5,5" hoặc "5.5" -> 5.5. Rỗng -> 0. Sai định dạng -> NaN
function docPhanTram(s: string): number {
  const t = s.replace(/\s/g, "").replace(",", ".");
  if (t === "") return 0;
  return /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}

const THONG_BAO_LOI: Record<string, string> = {
  PHI_TU_100: "Tổng phần trăm phí phải nhỏ hơn 100%.",
  PHI_VA_LAI_TU_100: "Tổng phí và lãi mong muốn (theo %) phải nhỏ hơn 100%. Nếu bạn muốn nhập số tiền, hãy chọn “Lãi theo số tiền”.",
  SO_KHONG_HOP_LE: "Vui lòng nhập số không âm.",
};

type TruongProps = {
  id: string;
  nhan: string;
  goiY?: string;
  giaTri: string;
  onChange: (v: string) => void;
  donVi: string;
  kieu?: "numeric" | "decimal";
};

function Truong({ id, nhan, goiY, giaTri, onChange, donVi, kieu = "numeric" }: TruongProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {nhan}
      </label>
      <div className="mt-1 flex items-center rounded-lg border focus-within:ring-2 focus-within:ring-blue-500">
        <input
          id={id}
          inputMode={kieu}
          value={giaTri}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-full min-w-0 bg-transparent px-3 py-3 text-base outline-none"
        />
        <span className="pr-3 text-sm text-gray-500">{donVi}</span>
      </div>
      {goiY && <p className="mt-1 text-xs text-gray-500">{goiY}</p>}
    </div>
  );
}

export default function TinhLoiNhuan() {
  const [cheDo, setCheDo] = useState<"giaBan" | "loiNhuan">("giaBan");
  const [giaNhap, setGiaNhap] = useState("");
  const [chiPhiDon, setChiPhiDon] = useState("");
  const [phiCoDinh, setPhiCoDinh] = useState("");
  const [phiGiaoDich, setPhiGiaoDich] = useState("");
  const [phiDichVu, setPhiDichVu] = useState("");
  const [thue, setThue] = useState("");
  const [loaiMucTieu, setLoaiMucTieu] = useState<"dong" | "phanTram">("dong");
  const [mucTieu, setMucTieu] = useState("");
  const [lamTron, setLamTron] = useState(true);
  const [giaBanNhap, setGiaBanNhap] = useState("");

  const tongPhi = [phiCoDinh, phiGiaoDich, phiDichVu, thue]
    .map(docPhanTram)
    .reduce((a, b) => a + b, 0);

  const dauVao = {
    giaNhap: docTien(giaNhap),
    chiPhiMoiDon: docTien(chiPhiDon),
    phiPhanTram: tongPhi,
  };

  const coDuLieu =
    giaNhap.trim() !== "" && (cheDo === "giaBan" || giaBanNhap.trim() !== "");

  let ketQua: KetQua | null = null;
  let loi = "";

  if (coDuLieu) {
    if (Object.values(dauVao).some((x) => Number.isNaN(x))) {
      loi = "Vui lòng chỉ nhập chữ số (ô phần trăm có thể dùng dấu phẩy, ví dụ 5,5).";
    } else {
      try {
        if (cheDo === "giaBan") {
          const gt = loaiMucTieu === "dong" ? docTien(mucTieu) : docPhanTram(mucTieu);
          if (Number.isNaN(gt)) throw new Error("SO_KHONG_HOP_LE");
          ketQua = tinhGiaBan(dauVao, { loai: loaiMucTieu, giaTri: gt }, lamTron);
        } else {
          const gb = docTien(giaBanNhap);
          if (Number.isNaN(gb)) throw new Error("SO_KHONG_HOP_LE");
          ketQua = tinhLoiNhuan(gb, dauVao);
        }
      } catch (e) {
        const ma = e instanceof Error ? e.message : "";
        loi = THONG_BAO_LOI[ma] ?? "Không tính được, vui lòng kiểm tra lại các số đã nhập.";
      }
    }
  }

  const nutChon = (dangChon: boolean) =>
    `min-h-11 flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
      dangChon ? "border-blue-600 bg-blue-600 text-white" : "hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="mt-6 space-y-6 rounded-xl border p-4 shadow-sm sm:p-6">
      {/* 1. Chi phí sản phẩm */}
      <section>
        <h2 className="text-base font-semibold">1. Chi phí cho mỗi sản phẩm</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Truong
            id="gia-nhap"
            nhan="Giá nhập / giá vốn"
            giaTri={giaNhap}
            onChange={setGiaNhap}
            donVi="đ"
          />
          <Truong
            id="chi-phi-don"
            nhan="Chi phí cố định mỗi đơn"
            goiY="Đóng gói, phí hạ tầng hoặc xử lý đơn, vận chuyển bạn chịu..."
            giaTri={chiPhiDon}
            onChange={setChiPhiDon}
            donVi="đ"
          />
        </div>
      </section>

      {/* 2. Phí tính theo % */}
      <section>
        <h2 className="text-base font-semibold">2. Các loại phí tính theo % giá bán</h2>
        <p className="mt-1 text-xs text-gray-500">
          Tự nhập theo biểu phí hiện hành của sàn bạn bán. Ô nào không có thì để trống.
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Truong id="phi-co-dinh" nhan="Phí cố định / hoa hồng ngành hàng" giaTri={phiCoDinh} onChange={setPhiCoDinh} donVi="%" kieu="decimal" />
          <Truong id="phi-giao-dich" nhan="Phí giao dịch / thanh toán" giaTri={phiGiaoDich} onChange={setPhiGiaoDich} donVi="%" kieu="decimal" />
          <Truong id="phi-dich-vu" nhan="Phí dịch vụ, voucher, affiliate..." giaTri={phiDichVu} onChange={setPhiDichVu} donVi="%" kieu="decimal" />
          <Truong id="thue" nhan="Thuế (nếu có)" giaTri={thue} onChange={setThue} donVi="%" kieu="decimal" />
        </div>
        <p className="mt-3 text-sm">
          Tổng phí theo %:{" "}
          <strong>{Number.isNaN(tongPhi) ? "—" : phanTram(tongPhi)}</strong>
        </p>
      </section>

      {/* 3. Chế độ tính */}
      <section>
        <h2 className="text-base font-semibold">3. Bạn muốn tính gì?</h2>
        <div className="mt-3 flex gap-2" role="group" aria-label="Chế độ tính">
          <button type="button" aria-pressed={cheDo === "giaBan"} onClick={() => setCheDo("giaBan")} className={nutChon(cheDo === "giaBan")}>
            Tìm giá bán cần đặt
          </button>
          <button type="button" aria-pressed={cheDo === "loiNhuan"} onClick={() => setCheDo("loiNhuan")} className={nutChon(cheDo === "loiNhuan")}>
            Tính lãi từ giá bán
          </button>
        </div>

        {cheDo === "giaBan" ? (
          <div className="mt-4 space-y-4">
            <div className="flex gap-2" role="group" aria-label="Loại mục tiêu lãi">
              <button type="button" aria-pressed={loaiMucTieu === "dong"} onClick={() => setLoaiMucTieu("dong")} className={nutChon(loaiMucTieu === "dong")}>
                Lãi theo số tiền
              </button>
              <button type="button" aria-pressed={loaiMucTieu === "phanTram"} onClick={() => setLoaiMucTieu("phanTram")} className={nutChon(loaiMucTieu === "phanTram")}>
                Lãi theo % giá bán
              </button>
            </div>
            <Truong
              id="muc-tieu"
              nhan="Lãi mong muốn mỗi sản phẩm"
              goiY="Để trống nếu chỉ muốn biết giá hòa vốn."
              giaTri={mucTieu}
              onChange={setMucTieu}
              donVi={loaiMucTieu === "dong" ? "đ" : "%"}
              kieu={loaiMucTieu === "dong" ? "numeric" : "decimal"}
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={lamTron} onChange={(e) => setLamTron(e.target.checked)} className="h-4 w-4" />
              Làm tròn giá bán lên đến hàng nghìn
            </label>
          </div>
        ) : (
          <div className="mt-4">
            <Truong id="gia-ban" nhan="Giá bán dự kiến" giaTri={giaBanNhap} onChange={setGiaBanNhap} donVi="đ" />
          </div>
        )}
      </section>

      {loi && <p className="text-sm text-red-600">{loi}</p>}

      {/* Kết quả */}
      {ketQua && (
        <section className="rounded-lg bg-blue-50 p-4 text-gray-900" aria-live="polite">
          {cheDo === "giaBan" ? (
            <>
              <p className="text-sm text-gray-600">Giá bán nên đặt</p>
              <p className="text-3xl font-bold">{tien(ketQua.giaBan)}</p>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600">Lợi nhuận mỗi sản phẩm</p>
              <p className={`text-3xl font-bold ${ketQua.loiNhuan < 0 ? "text-red-600" : "text-green-700"}`}>
                {tien(ketQua.loiNhuan)}
              </p>
              {ketQua.loiNhuan < 0 && (
                <p className="mt-1 text-sm text-red-600">Với các khoản phí này, đơn hàng bị lỗ.</p>
              )}
            </>
          )}

          <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {cheDo === "giaBan" && (
              <div className="flex justify-between gap-4 border-b border-blue-100 pb-1">
                <dt>Lãi thực tế</dt>
                <dd className="font-medium">{tien(ketQua.loiNhuan)}</dd>
              </div>
            )}
            <div className="flex justify-between gap-4 border-b border-blue-100 pb-1">
              <dt>Biên lợi nhuận</dt>
              <dd className="font-medium">{phanTram(ketQua.bienLoiNhuan)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-blue-100 pb-1">
              <dt>Phí theo % ({phanTram(tongPhi)})</dt>
              <dd className="font-medium">{tien(ketQua.tongPhiSan)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-blue-100 pb-1">
              <dt>Tiền còn lại sau phí %</dt>
              <dd className="font-medium">{tien(ketQua.giaBan - ketQua.tongPhiSan)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-blue-100 pb-1">
              <dt>Giá vốn + chi phí mỗi đơn</dt>
              <dd className="font-medium">{tien(dauVao.giaNhap + dauVao.chiPhiMoiDon)}</dd>
            </div>
          </dl>
        </section>
      )}
    </div>
  );
}