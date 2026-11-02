"use client";
import { useState } from "react";
import { docSoThanhChu } from "../../lib/docso";

const VI_DU = ["15", "105", "25.400", "1.500.000", "2.000.000.000"];

export default function DocSo() {
  const [raw, setRaw] = useState("");
  const [themDong, setThemDong] = useState(true);
  const [mienNam, setMienNam] = useState(false);
  const [copied, setCopied] = useState(false);

  let ketQua = "";
  let soDaDinhDang = "";
  let loi = "";

  if (raw.trim() !== "") {
    try {
      let chu = docSoThanhChu(raw);
      if (mienNam) chu = chu.replaceAll("nghìn", "ngàn").replaceAll("lẻ", "linh");
      const hoa = chu.charAt(0).toUpperCase() + chu.slice(1);
      ketQua = themDong ? `${hoa} đồng chẵn` : hoa;
      soDaDinhDang = BigInt(raw.trim().replace(/\s/g, "").replace(/\./g, "")).toLocaleString("vi-VN");
    } catch {
      loi = "Vui lòng nhập số nguyên, ví dụ: 1500000 hoặc 1.500.000";
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(ketQua);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mt-6 rounded-xl border p-5 shadow-sm">
      <label htmlFor="so" className="block text-sm font-medium">
        Nhập số tiền (VNĐ)
      </label>
      <div className="mt-1 flex gap-2">
        <input
          id="so"
          inputMode="numeric"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="Ví dụ: 1.500.000"
          className="w-full rounded-lg border px-3 py-3 text-xl"
        />
        {raw && (
          <button
            onClick={() => setRaw("")}
            className="rounded-lg border px-4 text-gray-600 hover:bg-gray-100"
          >
            Xóa
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-gray-500">Thử nhanh:</span>
        {VI_DU.map((v) => (
          <button
            key={v}
            onClick={() => setRaw(v)}
            className="rounded-full border px-3 py-1 hover:bg-gray-100"
          >
            {v}
          </button>
        ))}
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={themDong}
          onChange={(e) => setThemDong(e.target.checked)}
        />
        Thêm “đồng chẵn” ở cuối
      </label>

      <label className="mt-2 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={mienNam}
          onChange={(e) => setMienNam(e.target.checked)}
        />
        Đọc kiểu miền Nam (ngàn, linh)
      </label>

      {loi && <p className="mt-3 text-sm text-red-600">{loi}</p>}

      {ketQua && (
        <div className="mt-5 rounded-lg bg-blue-50 p-4 text-gray-900">
          <p className="text-sm text-gray-500">{soDaDinhDang} đồng được đọc là:</p>
          <p className="mt-1 text-2xl font-semibold leading-snug">{ketQua}</p>
          <button
            onClick={copy}
            className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {copied ? "Đã sao chép" : "Sao chép"}
          </button>
        </div>
      )}
    </div>
  );
}