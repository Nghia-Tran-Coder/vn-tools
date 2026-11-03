import Link from "next/link";
import { SITE_NAME } from "../lib/site";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-3xl items-center px-4 py-3">
        <Link href="/" className="text-lg font-bold">
          {SITE_NAME}
        </Link>
      </div>
    </header>
  );
}