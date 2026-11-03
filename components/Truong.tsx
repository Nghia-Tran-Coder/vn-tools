"use client";

type TruongProps = {
  id: string;
  nhan: string;
  goiY?: string;
  giaTri: string;
  onChange: (v: string) => void;
  donVi: string;
  kieu?: "numeric" | "decimal";
};

export default function Truong({ id, nhan, goiY, giaTri, onChange, donVi, kieu = "numeric" }: TruongProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {nhan}
      </label>
      <div className="mt-1 flex items-center rounded-lg border focus-within:ring-2 focus-within:ring-blue-500">
        <input
          id={id}
          inputMode={kieu}
          autoComplete="off"
          value={giaTri}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-full min-w-0 bg-transparent px-3 py-3 text-base outline-none"
        />
        <span className="pr-3 text-sm text-gray-500">{donVi}</span>
      </div>
      {goiY && <p className="mt-1 text-xs text-gray-500">{goiY}</p>}
    </div>
  );
}