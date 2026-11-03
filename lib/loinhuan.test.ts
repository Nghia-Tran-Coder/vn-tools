import assert from "node:assert/strict";
import { tinhGiaBan, tinhLoiNhuan } from "./loinhuan";

const d = { giaNhap: 100000, chiPhiMoiDon: 5000, phiPhanTram: 8 };

// Cần lãi 25.000đ, phí 8%: 130000 / 0.92 = 141304,35 -> làm tròn lên 141305
const a = tinhGiaBan(d, { loai: "dong", giaTri: 25000 }, false);
assert.equal(a.giaBan, 141305);
assert.ok(a.loiNhuan >= 25000);

// Làm tròn lên nghìn
const b = tinhGiaBan(d, { loai: "dong", giaTri: 25000 }, true);
assert.equal(b.giaBan, 142000);

// Lãi mong muốn 20% giá bán: 105000 / 0.72 = 145833,33 -> 145834
const c = tinhGiaBan(d, { loai: "phanTram", giaTri: 20 }, false);
assert.equal(c.giaBan, 145834);

// Tính lãi từ giá bán 200.000đ
const e = tinhLoiNhuan(200000, d);
assert.equal(e.tongPhiSan, 16000);
assert.equal(e.loiNhuan, 79000);
assert.equal(Math.round(e.bienLoiNhuan * 100) / 100, 39.5);

// Các trường hợp lỗi phải báo lỗi
assert.throws(() => tinhGiaBan({ ...d, phiPhanTram: 100 }, { loai: "dong", giaTri: 1000 }));
assert.throws(() => tinhGiaBan(d, { loai: "phanTram", giaTri: 95 }));

console.log("OK: tất cả test đều đúng");