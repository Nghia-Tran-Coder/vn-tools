export default function Bang({ dau, hang }: { dau: string[]; hang: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[30rem] border text-left text-sm">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            {dau.map((d) => (
              <th key={d} className="border px-3 py-2">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hang.map((h) => (
            <tr key={h[0]}>
              {h.map((o, i) => (
                <td key={i} className="border px-3 py-2 align-top">{o}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}