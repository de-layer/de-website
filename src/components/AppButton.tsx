import Link from "next/link";
import { PropsWithChildren } from "react";

export function AppButton({ href, children, className = "" }: PropsWithChildren<{ href: string; className?: string; }>) {
  return (
    <Link
      className={`w-full rounded-lg border-white border backdrop-blur-lg text-white flex flex-col items-center justify-center px-4 py-3 text-xl ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}