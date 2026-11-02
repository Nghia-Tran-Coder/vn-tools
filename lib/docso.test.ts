import assert from "node:assert/strict";
import { docSoThanhChu } from "./docso";

const cases: [string, string][] = [
  ["0", "không"],
  ["5", "năm"],
  ["10", "mười"],
  ["11", "mười một"],
  ["15", "mười lăm"],
  ["21", "hai mươi mốt"],
  ["24", "hai mươi tư"],
  ["25", "hai mươi lăm"],
  ["100", "một trăm"],
  ["105", "một trăm lẻ năm"],
  ["110", "một trăm mười"],
  ["1000", "một nghìn"],
  ["1005", "một nghìn không trăm lẻ năm"],
  ["1.500.000", "một triệu năm trăm nghìn"],
  ["1234567", "một triệu hai trăm ba mươi tư nghìn năm trăm sáu mươi bảy"],
  ["1000000000", "một tỷ"],
  ["-12", "âm mười hai"],
];

for (const [input, expected] of cases) {
  assert.equal(docSoThanhChu(input), expected, `Sai ở: ${input}`);
}
console.log(`OK: ${cases.length} test đều đúng`);