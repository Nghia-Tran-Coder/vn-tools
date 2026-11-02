const CHU_SO = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

function docNhomBa(n: number, laNhomDau: boolean): string {
  const tram = Math.floor(n / 100);
  const chuc = Math.floor((n % 100) / 10);
  const donvi = n % 10;
  const parts: string[] = [];

  // Nhóm không phải nhóm đầu thì luôn đọc "trăm" (vd: "không trăm lẻ năm")
  const docTram = tram > 0 || !laNhomDau;
  if (docTram) parts.push(`${CHU_SO[tram]} trăm`);

  if (chuc === 0) {
    if (donvi > 0) {
      if (docTram) parts.push("lẻ");
      parts.push(CHU_SO[donvi]);
    }
  } else if (chuc === 1) {
    parts.push("mười");
    if (donvi > 0) parts.push(donvi === 5 ? "lăm" : CHU_SO[donvi]);
  } else {
    parts.push(`${CHU_SO[chuc]} mươi`);
    if (donvi > 0) {
      if (donvi === 1) parts.push("mốt");
      else if (donvi === 4) parts.push("tư");
      else if (donvi === 5) parts.push("lăm");
      else parts.push(CHU_SO[donvi]);
    }
  }
  return parts.join(" ");
}

// i = vị trí nhóm: 0 = đơn vị, 1 = nghìn, 2 = triệu, 3 = tỷ, 4 = nghìn tỷ, ...
function donViNhom(i: number): string {
  const tenNho = ["", "nghìn", "triệu"][i % 3];
  const soTy = Math.floor(i / 3);
  return [tenNho, ...Array(soTy).fill("tỷ")].filter(Boolean).join(" ");
}

export function docSoThanhChu(input: string): string {
  const s = input.trim().replace(/\s/g, "");
  // Chỉ chấp nhận số nguyên, dấu chấm phải là dấu phân cách hàng nghìn đúng chuẩn
  if (!/^-?(\d{1,3}(\.\d{3})+|\d+)$/.test(s)) {
    throw new Error("INVALID_NUMBER");
  }
  const n = BigInt(s.replace(/\./g, ""));
  if (n === BigInt(0)) return "không";

  const am = n < BigInt(0);
  const digits = (am ? -n : n).toString();

  const groups: number[] = []; // groups[0] là nhóm thấp nhất
  for (let end = digits.length; end > 0; end -= 3) {
    groups.push(Number(digits.slice(Math.max(0, end - 3), end)));
  }

  const top = groups.length - 1;
  const out: string[] = [];
  for (let i = top; i >= 0; i--) {
    if (groups[i] === 0) continue;
    out.push([docNhomBa(groups[i], i === top), donViNhom(i)].filter(Boolean).join(" "));
  }
  return (am ? "âm " : "") + out.join(" ");
}
