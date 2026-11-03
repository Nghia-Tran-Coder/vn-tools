const dinhDang = new Intl.NumberFormat("vi-VN");

export const tien = (n: number) => `${dinhDang.format(n)} đ`;
export const phanTram = (n: number) => `${(Math.round(n * 10) / 10).toString().replace(".", ",")}%`;
export const soThapPhan = (n: number) => (Math.round(n * 100) / 100).toString().replace(".", ",");

// "1.500.000" -> 1500000. Rỗng -> 0. Sai định dạng -> NaN
export function docTien(s: string): number {
  const t = s.replace(/[.\s]/g, "");
  if (t === "") return 0;
  return /^\d+$/.test(t) ? Number(t) : NaN;
}

// "5,5" hoặc "5.5" -> 5.5. Rỗng -> 0. Sai định dạng -> NaN
export function docPhanTram(s: string): number {
  const t = s.replace(/\s/g, "").replace(",", ".");
  if (t === "") return 0;
  return /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}