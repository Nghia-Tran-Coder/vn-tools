export type DauVao = {
  giaNhap: number; // giá nhập/giá vốn 1 sản phẩm (đồng)
  chiPhiMoiDon: number; // đóng gói, vận chuyển bạn chịu, quảng cáo phân bổ... (đồng)
  phiPhanTram: number; // tổng phí tính theo % giá bán: phí cố định + thanh toán + dịch vụ + thuế (%)
};

export type KetQua = {
  giaBan: number;
  tongPhiSan: number;
  loiNhuan: number;
  bienLoiNhuan: number; // % trên giá bán
};

export type MucTieu =
  | { loai: "dong"; giaTri: number }
  | { loai: "phanTram"; giaTri: number };

function kiemTra(d: DauVao) {
  const cacSo = [d.giaNhap, d.chiPhiMoiDon, d.phiPhanTram];
  if (cacSo.some((x) => !Number.isFinite(x) || x < 0)) throw new Error("SO_KHONG_HOP_LE");
  if (d.phiPhanTram >= 100) throw new Error("PHI_TU_100");
}

export function tinhLoiNhuan(giaBan: number, d: DauVao): KetQua {
  kiemTra(d);
  const tongPhiSan = (giaBan * d.phiPhanTram) / 100;
  const loiNhuan = giaBan - tongPhiSan - d.giaNhap - d.chiPhiMoiDon;
  return {
    giaBan,
    tongPhiSan: Math.round(tongPhiSan),
    loiNhuan: Math.round(loiNhuan),
    bienLoiNhuan: giaBan > 0 ? (loiNhuan / giaBan) * 100 : 0,
  };
}

export function tinhGiaBan(d: DauVao, mucTieu: MucTieu, lamTronNghin = true): KetQua {
  kiemTra(d);
  if (!Number.isFinite(mucTieu.giaTri) || mucTieu.giaTri < 0) throw new Error("SO_KHONG_HOP_LE");

  const chiPhi = d.giaNhap + d.chiPhiMoiDon;
  let giaBan: number;

  if (mucTieu.loai === "dong") {
    giaBan = (chiPhi + mucTieu.giaTri) / (1 - d.phiPhanTram / 100);
  } else {
    const mau = 1 - (d.phiPhanTram + mucTieu.giaTri) / 100;
    if (mau <= 0) throw new Error("PHI_VA_LAI_TU_100");
    giaBan = chiPhi / mau;
  }

  // Trừ 1 lượng rất nhỏ để tránh sai số số thực làm tròn lên nhầm
  giaBan = lamTronNghin
    ? Math.ceil(giaBan / 1000 - 1e-9) * 1000
    : Math.ceil(giaBan - 1e-9);

  return tinhLoiNhuan(giaBan, d);
}