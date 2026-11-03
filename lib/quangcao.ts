import { tinhLoiNhuan, type DauVao } from "./loinhuan";

export type KetQuaQuangCao = {
  loiTruocQC: number; // lãi mỗi đơn trước khi trừ quảng cáo (đồng)
  bienTruocQC: number; // % trên giá bán
  roasHoaVon: number | null; // null nếu chưa có lãi trước quảng cáo
  acosToiDa: number; // % chi phí quảng cáo trên doanh thu mà vẫn hòa vốn
  cpaToiDa: number; // chi phí quảng cáo tối đa cho mỗi đơn
  roasMucTieu: number | null; // ROAS cần đạt để còn lại đúng mức lãi mong muốn
};

function kiemTraGiaBan(giaBan: number) {
  if (!Number.isFinite(giaBan) || giaBan <= 0) throw new Error("GIA_BAN_KHONG_HOP_LE");
}

export function tinhQuangCao(giaBan: number, d: DauVao, loiMucTieu = 0): KetQuaQuangCao {
  kiemTraGiaBan(giaBan);
  if (!Number.isFinite(loiMucTieu) || loiMucTieu < 0) throw new Error("SO_KHONG_HOP_LE");

  const loiTruocQC = tinhLoiNhuan(giaBan, d).loiNhuan;
  const bienTruocQC = (loiTruocQC / giaBan) * 100;
  const conLai = loiTruocQC - loiMucTieu;

  return {
    loiTruocQC,
    bienTruocQC,
    roasHoaVon: loiTruocQC > 0 ? giaBan / loiTruocQC : null,
    acosToiDa: Math.max(bienTruocQC, 0),
    cpaToiDa: Math.max(loiTruocQC, 0),
    roasMucTieu: conLai > 0 ? giaBan / conLai : null,
  };
}

// Từ chi tiêu và doanh thu quảng cáo thực tế, tính lãi còn lại sau quảng cáo
export function tinhLaiThucTe(giaBan: number, d: DauVao, chiTieuQC: number, doanhThuQC: number) {
  kiemTraGiaBan(giaBan);
  if (
    !Number.isFinite(chiTieuQC) || chiTieuQC <= 0 ||
    !Number.isFinite(doanhThuQC) || doanhThuQC < 0
  ) {
    throw new Error("SO_KHONG_HOP_LE");
  }
  const loiMoiDon = tinhLoiNhuan(giaBan, d).loiNhuan;
  const soDon = doanhThuQC / giaBan;
  return {
    roasThucTe: doanhThuQC / chiTieuQC,
    soDon,
    loiSauQC: Math.round(soDon * loiMoiDon - chiTieuQC),
  };
}