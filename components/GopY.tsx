import { GOP_Y_URL } from "../lib/site";

export default function GopY({ tenCongCu }: { tenCongCu: string }) {
  if (!GOP_Y_URL) return null;
  return (
    <aside className="mt-10 rounded-xl border p-4 text-sm">
      <p className="font-semibold">Công cụ này có giúp ích cho bạn không?</p>
      <p className="mt-1 text-gray-500">
        Chỉ mất 1 phút, trả lời giúp mình để cải thiện công cụ {tenCongCu}.
      </p>
      <a
        href={GOP_Y_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Góp ý nhanh
      </a>
    </aside>
  );
}