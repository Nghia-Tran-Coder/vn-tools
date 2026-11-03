import assert from "node:assert/strict";
import { tinhQuangCao, tinhLaiThucTe } from "./quangcao";

// Cùng ví dụ với tool tính lợi nhuận: lãi trước quảng cáo mỗi đơn là 46.000 đ
const d = { giaNhap: 100000, chiPhiMoiDon: 8000, phiPhanTram: 23 };

const a = tinhQuangCao(200000, d, 10000);
assert.equal(a.loiTruocQC, 46000);
assert.equal(a.cpaToiDa, 46000);
assert.equal(Math.round(a.acosToiDa * 10) / 10, 23);
assert.equal(Math.round((a.roasHoaVon as number) * 100) / 100, 4.35);
assert.equal(Math.round((a.roasMucTieu as number) * 100) / 100, 5.56);

// Chưa có lãi trước quảng cáo thì không có ROAS hòa vốn
const b = tinhQuangCao(100000, d);
assert.equal(b.roasHoaVon, null);

// ROAS thực tế 4 nhưng vẫn lỗ: 100 đơn x 46.000 = 4.600.000, chi quảng cáo 5.000.000
const c = tinhLaiThucTe(200000, d, 5000000, 20000000);
assert.equal(c.roasThucTe, 4);
assert.equal(c.loiSauQC, -400000);

// Số không hợp lệ phải báo lỗi
assert.throws(() => tinhQuangCao(0, d));
assert.throws(() => tinhLaiThucTe(200000, d, 0, 1000000));

console.log("OK: tất cả test đều đúng");