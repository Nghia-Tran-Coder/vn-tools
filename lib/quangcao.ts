import { tinhLoiNhuan, type DauVao } from "./loinhuan";

export type KetQuaQuangCao = {
  loiTruocQC: number; // lãi bình quân mỗi đơn ĐẶT trước quảng cáo, đã tính đơn hoàn (đồng)
  bienTruocQC: number; // % trên giá bán
  roasHoaVon: number | null; // null nếu chưa có lãi trước quảng cáo
  acosToiDa: number; // % chi phí quảng cáo trên doanh thu mà vẫn hòa vốn
  cpaToiDa: number; // chi phí quảng cáo tối đa cho mỗi đơn đặt
  roasMucTieu: number | null; // ROAS cần đạt để còn lại đúng mức lãi mong muốn
};

function kiemTraGiaBan(giaBan: number) {
  if (!Number.isFinite(giaBan) || giaBan <= 0) throw new Error("GIA_BAN_KHONG_HOP_LE");
}

// Tỷ lệ hoàn/hủy tính theo %, phải từ 0 đến dưới 100
function giuLai(tyLeHoan: number): number {
  if (!Number.isFinite(tyLeHoan) || tyLeHoan < 0 || tyLeHoan >= 100) {
    throw new Error("TY_LE_HOAN_KHONG_HOP_LE");
  }
  return 1 - tyLeHoan / 100;
}

// Giả định: đơn hoàn hoặc hủy không tạo doanh thu và không phát sinh thêm chi phí
export function tinhQuangCao(
  giaBan: number,
  d: DauVao,
  loiMucTieu = 0,
  tyLeHoan = 0,
): KetQuaQuangCao {
  kiemTraGiaBan(giaBan);
  if (!Number.isFinite(loiMucTieu) || loiMucTieu < 0) throw new Error("SO_KHONG_HOP_LE");
  const giu = giuLai(tyLeHoan);

  const loiMoiDonDat = tinhLoiNhuan(giaBan, d).loiNhuan * giu;
  const bienTruocQC = (loiMoiDonDat / giaBan) * 100;
  const conLai = loiMoiDonDat - loiMucTieu;

  return {
    loiTruocQC: loiMoiDonDat,
    bienTruocQC,
    roasHoaVon: loiMoiDonDat > 0 ? giaBan / loiMoiDonDat : null,
    acosToiDa: Math.max(bienTruocQC, 0),
    cpaToiDa: Math.max(loiMoiDonDat, 0),
    roasMucTieu: conLai > 0 ? giaBan / conLai : null,
  };
}

// Từ chi tiêu và doanh thu quảng cáo thực tế (tính trên đơn đặt), tính lãi còn lại sau quảng cáo
export function tinhLaiThucTe(
  giaBan: number,
  d: DauVao,
  chiTieuQC: number,
  doanhThuQC: number,
  tyLeHoan = 0,
) {
  kiemTraGiaBan(giaBan);
  if (
    !Number.isFinite(chiTieuQC) || chiTieuQC <= 0 ||
    !Number.isFinite(doanhThuQC) || doanhThuQC < 0
  ) {
    throw new Error("SO_KHONG_HOP_LE");
  }
  const giu = giuLai(tyLeHoan);

  const loiMoiDonDat = tinhLoiNhuan(giaBan, d).loiNhuan * giu;
  const soDon = doanhThuQC / giaBan;
  return {
    roasThucTe: doanhThuQC / chiTieuQC,
    soDon,
    loiSauQC: Math.round(soDon * loiMoiDonDat - chiTieuQC),
  };
}